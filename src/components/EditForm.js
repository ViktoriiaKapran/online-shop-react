import { Box, Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import { useGetAllCategoriesQuery } from '../store/api';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function EditForm({ id, name, categories, price, description, goodImages, buttonText, entity, onSubmit }) {
  const { data } = useGetAllCategoriesQuery();
  const [itemName, setItemName] = useState(name || '');
  const [selectedCategories, setSelectedCategories] = useState(categories || []);
  const [itemPrice, setItemPrice] = useState(price || 0);
  const [itemDescription, setItemDescription] = useState(description || '');
  const [images, setImages] = useState(goodImages || []);

  const onCategoryClick = (category) => {
    if (selectedCategories.find(selectedCategory => selectedCategory._id == category._id)) {
      setSelectedCategories(selectedCategories.filter(selectedCategory => selectedCategory._id != category._id));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  const handlePriceChange = (event) => {
    setItemPrice(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setItemDescription(event.target.value);
  }

  const handleSubmit = () => {

    const item = {
      name: itemName,
    };
    if (entity == 'good') {
      item.categories = selectedCategories.map(category => ({
        _id: category._id,
        name: category.name
      }));
      item.price = +itemPrice;
      item.description = itemDescription;
      item.images = images.map(image => ({ _id: image._id }));
    }
    if (entity == 'category') {
      item.subCategories = selectedCategories.map(subCategory => ({
        _id: subCategory._id,
        name: subCategory.name,
        
      }));
    }
    if (id) {
      item._id = id;
    }
    if (onSubmit) {
      onSubmit(item);
    }
  };

  return (
    <Box component='form' onSubmit={handleSubmit}>
      <Stack>
        <TextField
          sx={{ m: '0 auto 20px', width: '100%' }}
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          label='Name'
        />
        <FormControl
          sx={{ m: '0 auto 20px', width: '100%' }}>
          <InputLabel>{entity == 'good' ? 'Category' : 'Subcategories'}</InputLabel>
          <Select
            multiple
            value={selectedCategories}
            input={<OutlinedInput label={entity == 'good' ? 'Category' : 'Subcategories'} />}
            renderValue={(selected) => selected.map(item => item.name).join(', ')}
            MenuProps={MenuProps}
          >
            {data?.CategoryFind?.map((category) => (
              <MenuItem key={category._id} value={category} onClick={() => onCategoryClick(category)}>
                <Checkbox checked={!!selectedCategories?.find(selectedCategory => selectedCategory._id === category._id)} />
                <ListItemText primary={category.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {entity == 'good' &&
          <>
            <TextField
              sx={{ m: '0 auto 20px', width: '100%' }}
              type='number'
              label='Price'
              value={itemPrice}
              onChange={handlePriceChange}
            />
            <TextField
              sx={{ m: '0 auto 20px', width: '100%' }}
              label="Description"
              multiline
              rows={4}
              value={itemDescription}
              onChange={handleDescriptionChange}
            />
            <ImageUploader previousImages={goodImages} onChange={(images) => setImages(images)} />
          </>
        }
        <Button variant="contained" sx={{ maxWidth: '200px', width: '100%', m: '20px auto 0' }} onClick={() => handleSubmit()}>{buttonText}</Button>
      </Stack>
    </Box>
  )
}

export default EditForm;