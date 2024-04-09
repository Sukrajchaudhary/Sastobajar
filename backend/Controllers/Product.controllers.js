const { default: mongoose } = require("mongoose");
const { Product } = require("../models/Product.model");
const { uploadOnCloudinary } = require("../utils/cloudinary");
exports.createProduct = async (req, res) => {
  try {
    const { id } = req.user;
    const thumbnailLocalPath = req.files?.thumbnail[0]?.path;
    const imagesLocalPath = req.files?.images[0]?.path;
    console.log(thumbnailLocalPath);
    if (!thumbnailLocalPath) {
      return res.status(400).json({
        message: "Thumbnail is required",
      });
    }

    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
    const images = await uploadOnCloudinary(imagesLocalPath);
    const product = new Product({
      ...req.body,
      user: id,
      thumbnail: thumbnail.url || "",
      images: images.url || "",
    });
    await product.save();
    return res
      .status(200)
      .json({ message: "Product Added SuccessFully", product });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
exports.getProductByID = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.aggregate([
      {
        $match: {
          "_id": new mongoose.Types.ObjectId(id)
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "owner",
          pipeline: [
            {
              $project: {
                username: 1,
                email: 1,
                OrganizationsName: 1,
                _id: 1
              }
            }
          ]
        }
      }
    ]);
    return res.status(200).json(product[0]); // Return the first element of the product array
  } catch (error) {
    return res.status(500).json({ error: error.message }); // Ensure error is sent as JSON
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    let condition = [
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "owner",
          pipeline: [
            {
              $project: {
                username: 1,
                email: 1,
                OrganizationsName: 1,
                _id: 1,
              },
            },
          ],
        },
      },
    ];
    if (req.query.search) {
      condition.unshift({
        $search: {
          index: "default",
          text: {
            query: req.query.search.toLowerCase(),
            path: {
              wildcard: "*",
            },
          },
        },
      });
    }

    if (req.query.category) {
      condition.unshift({
        $match: {
          category: req.query.category,
        },
      });
    }
    if (req.query.brand) {
      condition.unshift({
        $match: {
          brand: req.query.brand,
        },
      });
    }
    if (req.query._sort && req.query._order) {
      condition.push({
        $sort: {
          [req.query._sort]: Number(req.query._order),
        },
      });
    }

    if (req.query._page && req.query._limit) {
      const pageSize = parseInt(req.query._limit, 10);
      const page = parseInt(req.query._page, 10);
      condition.push(
        {
          $skip: (page - 1) * pageSize,
        },
        { $limit: pageSize }
      );
    }
    const product = await Product.aggregate(condition).exec();
    res.set("X-TOTAL-COUNT", product.length);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

exports.getAllUsersProducts = async (req, res) => {
  try {
    const { id } = req.user;
    const product = await Product.find({ user: id }).select("-user");
    if (!product) {
      return res.status(400).json({
        message: "No Product Found",
      });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete({ _id: id });
    return res.status(200).json({
      message: "Product deleted SuccesFully",
      product,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).json({
      message: "Product Updated SuccessFully",
      product,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
