const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{model: Product, through: {model: ProductTag}}]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product, through: {model: ProductTag}}]
    });

    if(!tagData) {
      res.status(404).json({message: 'No tag with that id.'});
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
  
router.post('/', async (req, res) => {
  Tag.create(req.body)
    .then((tag) => {
      if (req.body.productIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {where: {id: req.params.id}});

    if(!tagData) {
      res.status(404).json({message: 'No tag with that id.'});
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await ProductTag.destroy({where: {tag_id: req.params.id}});
    const tagData = await Tag.destroy({
      where: {id: req.params.id}
    });
    if(!tagData) {
      res.status(404).json({message: 'No tag with that id.'});
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
