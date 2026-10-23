import unittest
from fastapi.testclient import TestClient
from backend.app import app


class QuoteTests(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)

    def test_health(self):
        self.assertEqual(self.client.get("/api/health").json()["status"], "ok")

    def test_all_allowed_combinations(self):
        for width in range(3, 7):
            for depth in range(2, 6):
                for roof, price in (("poly", 1200), ("metal", 1900)):
                    with self.subTest(width=width, depth=depth, roof=roof):
                        response = self.client.post("/api/demo/quote", json=dict(width=width, depth=depth, roof=roof))
                        self.assertEqual(response.status_code, 200)
                        self.assertEqual(response.json()["total"], width * depth * (3200 + price))
                        self.assertTrue(response.json()["illustrative"])

    def test_rejects_invalid_input(self):
        for patch in ({"width": 100}, {"depth": 0}, {"roof": "invalid"}, {"width": 3.2}, {"width": True}, {"unknown": "x"}):
            with self.subTest(patch=patch):
                data = dict(width=4, depth=3, roof="poly") | patch
                self.assertEqual(self.client.post("/api/demo/quote", json=data).status_code, 422)

    def test_unknown_route_is_404(self):
        self.assertEqual(self.client.get("/api/missing").status_code, 404)
