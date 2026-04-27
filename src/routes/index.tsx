import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  useEffect(() => {
    window.location.replace("/museo/index.html");
  }, []);
  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ backgroundColor: "#FAF6F1", fontFamily: "Inter, sans-serif" }}
    >
      <p>Reindirizzamento al Museo delle Sabbie…</p>
    </div>
  );
}
