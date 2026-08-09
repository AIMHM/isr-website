import "dotenv/config";
import { prisma } from "../lib/prisma";

async function main() {
  if (
    process.env.ALLOW_DEMO_SEED !== "true"
  ) {
    throw new Error(
      "Refusing to seed. Set ALLOW_DEMO_SEED=true only for an isolated development database.",
    );
  }

  await prisma.announcement.create({
    data: {
      title: "Demo ISR update",
      body:
        "Development-only sample content. Replace this with verified ISR information.",
      pinned: true,
      priority: "important",
    },
  });

  console.log(
    "Seeded development-only sample content.",
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
