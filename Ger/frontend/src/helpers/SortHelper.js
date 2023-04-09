class SortHelper {

    constructor() { }

    customSortByText(entity){
        entity.sort((a, b) => {
            if (a.text < b.text) {
              return -1;
            } else if (a.text > b.text) {
              return 1;
            } else {
              return 0;
            }
          })
    }

    customSortByDate(entity){
        entity.sort((a, b) => {
            if (a.createDate < b.createDate) {
              return -1;
            } else if (a.createDate > b.createDate) {
              return 1;
            } else {
              return 0;
            }
          });
    }

    customReverseSortByDate(entity){
        entity.sort((a, b) => {
            if (a.createDate < b.createDate) {
              return 1;
            } else if (a.createDate > b.createDate) {
              return -1;
            } else {
              return 0;
            }
          });
    }

}

export default new SortHelper();