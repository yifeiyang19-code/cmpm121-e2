export {};

const canvas = document.querySelector<HTMLCanvasElement>("#allocation-canvas")!;
const ctx = canvas.getContext("2d")!;
const readout = document.querySelector<HTMLParagraphElement>(
  "#allocation-readout",
)!;
let num_people = 2;

type AllocationState = {
  num_people: number;
  production_amount: number;
  resource_demand: number;
  resource_deficit: number;
};

function getAllocationState(): AllocationState {
  const production_amount = num_people * 3;
  const resource_demand = 6;
  const resource_deficit = production_amount - resource_demand;
  return {
    num_people,
    production_amount,
    resource_demand,
    resource_deficit,
  };
}
function updateAllocation() {
  const { num_people, production_amount, resource_demand, resource_deficit } =
    getAllocationState();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < 6; i++) {
    ctx.fillStyle = i < num_people ? "#27766b" : "#c9d2c9";
    ctx.fillRect(18 + i * 45, 16, 36, 36);
    ctx.fillStyle = i < num_people ? "#ffffff" : "#233e43";
    ctx.font = "16px system-ui";
    ctx.fillText(String(i + 1), 31 + i * 45, 40);
  }
  ctx.fillStyle = "#233e43";
  ctx.font = "14px system-ui";
  ctx.fillText(`Producers: ${num_people} / 6`, 18, 76);
  ctx.fillText(`Production: ${production_amount}`, 18, 102);
  ctx.fillStyle = "#27766b";
  ctx.fillRect(18, 110, production_amount * 14, 20);
  ctx.fillStyle = "#233e43";
  ctx.fillText(`Consumption: ${resource_demand}`, 18, 154);
  ctx.fillStyle = "#a44d23";
  ctx.fillRect(18, 162, resource_demand * 14, 20);
  readout.textContent = textContent(
    num_people,
    production_amount,
    resource_demand,
    resource_deficit,
  );
}

function textContent(
  num_people: number,
  production_amount: number,
  resource_demand: number,
  resource_deficit: number,
): string {
  return `Assigned: ${num_people}/6 · Production: ${production_amount} · Consumption: ${resource_demand} · Balance: ${
    resource_deficit > 0 ? "+" : ""
  }${resource_deficit}`;
}

document.querySelector<HTMLButtonElement>("#allocation-less")!.onclick = () => {
  num_people = Math.max(0, num_people - 1);
  updateAllocation();
};
document.querySelector<HTMLButtonElement>("#allocation-more")!.onclick = () => {
  num_people = Math.min(6, num_people + 1);
  updateAllocation();
};
document.querySelector<HTMLButtonElement>("#allocation-reset")!.onclick =
  () => {
    num_people = 2;
    updateAllocation();
  };
updateAllocation();
