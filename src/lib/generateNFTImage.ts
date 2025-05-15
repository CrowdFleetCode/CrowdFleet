export function generateNftImage({
  name,
  member,
  count,
}: {
  name: string;
  member: string;
  count: number;
}): string {
  const width = 600;
  const height = 400;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");
  ctx.fillStyle = "#f3f4f6";
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "#6366f1";
  ctx.lineWidth = 6;
  ctx.strokeRect(12, 12, width - 24, height - 24);

  ctx.fillStyle = "#1f2937";
  ctx.font = "bold 28px Arial";
  ctx.textAlign = "center";
  ctx.fillText(name, width / 2, 90);

  ctx.font = "18px Arial";
  ctx.fillText(`Member: ${member}`, width / 2, 160);

  ctx.fillText(`Contribution: ${count} SOL`, width / 2, 200);

  return canvas.toDataURL("image/png");
}