export const ArrangeEqualHeightColumns = (images) => {
  const columns = [];
  images.forEach((img, index) => {
    // push three first img into 3d array
    if (index < 3) {
      columns[index] = [];
      columns[index].push(img);
    } else {
      const columnsHeightSum = columns.map((el) =>
        el
          .map(({ height, width }) => {
            // 1320 is max height of the window - it will be used as a base to find common ratio value;
            const ratio = width / 1320;
            return height / ratio;
          })
          .reduce((a, b) => a + b, 0)
      );
      const indexOfSmallestHeightSum = columnsHeightSum.indexOf(Math.min(...columnsHeightSum));
      // push next img to the smallest column
      columns[indexOfSmallestHeightSum].push(img);
    }
  });

  return columns;
};

export const GetCategories = (photos) =>
  photos
    .map(({ tags }) => tags && tags.map(({ title }) => title))
    .flat(1)
    .filter((categgory, index, array) => array.indexOf(categgory) === index);
