"""Public illustrative calculator. No lead or personal-data collection."""
from typing import Literal

from fastapi import FastAPI
from pydantic import BaseModel, ConfigDict, Field

app = FastAPI(title="Marseloid demo API", docs_url=None, redoc_url=None)


class QuoteInput(BaseModel):
    model_config = ConfigDict(extra="forbid")
    width: int = Field(ge=3, le=6, strict=True)
    depth: int = Field(ge=2, le=5, strict=True)
    roof: Literal["poly", "metal"]


@app.get("/api/health")
def health():
    return {"status": "ok", "service": "marseloid"}


@app.post("/api/demo/quote")
def quote(data: QuoteInput):
    area = data.width * data.depth
    frame = area * 3200
    covering = area * (1200 if data.roof == "poly" else 1900)
    return {
        "area": area, "frame": frame, "covering": covering,
        "total": frame + covering, "currency": "RUB", "illustrative": True,
        "notice": "Условный расчёт. Не является коммерческим предложением.",
    }
