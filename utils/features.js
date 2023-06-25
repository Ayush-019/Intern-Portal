class Features {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          companyName: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    //Remove some Fields
    const removeFields = ["keyword"];
    removeFields.forEach((key) => delete queryCopy[key]);

    //Filter for Price
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lte|lt)\b/g, (val) => `$${val}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
}

module.exports = Features;
