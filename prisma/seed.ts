import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.mapNode.create({
    data: {
      id: 'test-course-1-node',
      x: 100,
      y: 1100,
      hidden: false,
      scale: 1,
      width: 400,
      height: 400,
      courseData: {
        create: {
          id: 'test-course-1-node-data',
          courseId: 'test-course-1',
        },
      },
    },
  });

  await prisma.mapNode.create({
    data: {
      id: 'test-course-2-node',
      x: 100,
      y: 600,
      hidden: false,
      scale: 1,
      width: 400,
      height: 400,
      courseData: {
        create: {
          id: 'test-course-2-node-data',
          courseId: 'test-course-2',
        },
      },
    },
  });

  await prisma.mapNode.create({
    data: {
      id: 'test-course-3-node',
      x: 100,
      y: 100,
      hidden: false,
      scale: 1,
      width: 400,
      height: 400,
      courseData: {
        create: {
          id: 'test-course-3-node-data',
          courseId: 'test-course-3',
        },
      },
    },
  });

  await prisma.mapNode.create({
    data: {
      id: 'image-node-1',
      x: 500,
      y: 100,
      hidden: false,
      scale: 1,
      width: 400,
      height: 400,
      rotation: 30,
      imageData: {
        create: {
          id: 'image-node-1-node-data',
          src: 'https://crowdbotics.ghost.io/content/images/2021/07/React-Native.png',
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
