#!/usr/bin/env bash
set -euo pipefail
cd /home/marseloid
phase="${1:?Specify http or https}"
case "$phase" in http|https) ;; *) exit 2 ;; esac
source_file="/home/marseloid/deploy/nginx.${phase}.conf"
target=/etc/nginx/sites-available/marseloid.online
enabled=/etc/nginx/sites-enabled/marseloid.online
if [[ -L "$enabled" ]]; then
    [[ "$(readlink -f "$enabled")" == "$target" ]] || { echo 'Unexpected vhost symlink; stopping'; exit 1; }
elif [[ -e "$enabled" || -e "$target" ]]; then
    echo 'Unmanaged vhost already exists; stopping'
    exit 1
fi
if [[ "$phase" == https ]]; then
    test -s /etc/letsencrypt/live/marseloid.online/fullchain.pem
    test -s /etc/letsencrypt/live/marseloid.online/privkey.pem
fi
backup_dir=$(mktemp -d /home/marseloid-nginx-backup-XXXXXXXX)
had_target=false
had_enabled=false
if [[ -e "$target" ]]; then cp -a "$target" "$backup_dir/marseloid.online"; had_target=true; fi
if [[ -L "$enabled" ]]; then had_enabled=true; fi
echo "Rollback backup: $backup_dir (previous config present: $had_target)"
restore() {
    if [[ "$had_target" == true ]]; then
        install -m 0644 "$backup_dir/marseloid.online" "$target"
    elif [[ -f "$target" ]]; then
        unlink "$target"
    fi
    if [[ "$had_enabled" == false && -L "$enabled" ]]; then unlink "$enabled"; fi
    nginx -t
}
install -m 0644 "$source_file" "$target"
if [[ "$had_enabled" == false ]]; then ln -s "$target" "$enabled"; fi
if ! nginx -t; then restore; echo 'Validation failed; restored without reload'; exit 1; fi
if ! systemctl reload nginx; then restore; systemctl reload nginx; echo 'Reload failed; restored'; exit 1; fi
echo "Installed $phase vhost; graceful reload successful"
