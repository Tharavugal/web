import Layout from '@/components/layouts/DefaultLayout';
import { connect } from '@/utils/db';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Paper,
  Typography,
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ProgressiveImg from '@/components/ProgressiveImg';

const CATEGORY_COLORS = {
  Vegetables: '#2ECC40',
  'Grains, legumes, nuts and seeds': 'rgb(102, 60, 0)',
  Fruits: '#FF851B',
  'Meat and poultry': '#FF4136',
  'Fish and seafood': '#0074D9',
  'Dairy foods': '',
  Eggs: '#85144b',
};

function FICard({ food, R2_DOMAIN }) {
  return (
    <Card sx={{ minWidth: 200, m: 1 }} variant="outlined">
      <CardContent>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ width: '100px', height: '150px' }}>
            <ProgressiveImg
              src={`${R2_DOMAIN}/${food.image}`}
              alt="Product Thumbnail"
            />
          </Box>
          <Box sx={{ px: 2 }}>
            <Typography
              variant="h6"
              component="a"
              href={`/food-ingredients/${food.slug}`}
            >
              {food.name}
            </Typography>
            <Typography sx={{ mt: 2 }} color="text.secondary">
              {food.foodType}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {food.categories?.map((c, i) => (
          <Chip
            key={i}
            label={c}
            size="small"
            sx={{
              color: CATEGORY_COLORS[c],
              borderColor: CATEGORY_COLORS[c],
              fontWeight: 'bold',
              m: 1,
            }}
            variant="outlined"
          />
        ))}
      </CardActions>
    </Card>
  );
}

export default function FoodIngredients({ data }) {
  return (
    <Layout title="Food Ingredients">
      <Box textAlign="center">
        <Typography variant="h5">Food Ingredients</Typography>
      </Box>
      <Paper sx={{ mt: 2, p: 3 }}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
          <ChevronRightIcon /> Featured
        </Typography>
        <Divider />
        <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap' }}>
          {data.foods.map((f, i) => (
            <FICard key={i} food={f} R2_DOMAIN={data.R2_DOMAIN} />
          ))}
        </Box>
      </Paper>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const client = await connect();
  const DB_NAME = process.env.DB_NAME;
  const col = client.db(DB_NAME).collection('food-ingredients');
  const cursor = col.find(
    {},
    {
      projection: {
        _id: 0,
        name: 1,
        foodType: 1,
        categories: 1,
        slug: 1,
        image: 1,
      },
    }
  );

  const foods = JSON.parse(JSON.stringify(await cursor.toArray()));
  return {
    props: {
      data: {
        foods,
        R2_DOMAIN: process.env.R2_DOMAIN,
      },
    },
  };
}
