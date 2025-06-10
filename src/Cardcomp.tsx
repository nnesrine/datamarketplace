// import React from 'react';
// import axios from 'axios';
// import { useState } from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import CardActionArea from '@mui/material/CardActionArea';
// import CardActions from '@mui/material/CardActions';

// // 1. Define an interface for your component's props, just for title and text
// interface CardcompProps {
//   title: string;
//   text: string;
// }

// // 2. Type the functional component using React.FC and your props interface
// const Cardcomp: React.FC<CardcompProps> = ({ title, text }) => {
//   const [email, setEmail] = useState("");
//   const [apiKey, setApiKey] = useState("");

//   const handlePurchase = async () => {
//     const res = await axios.post("http://localhost:8000/get-api-key", { email });
//     setApiKey(res.data.api_key);
//   };
//   return (
//     <Card sx={{ maxWidth: 345 }}>
//       <CardActionArea>
//         <CardMedia
//           component="img"
//           height="140"
//           image="/static/images/cards/contemplative-reptile.jpg" // Image remains static
//           alt={title} // Using title for alt text for accessibility
//         />
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="div">
//             {title} {/* Use the 'title' prop here */}
//           </Typography>
//           <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//             {text} {/* Use the 'text' prop here */}
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//         <input
//         placeholder="Enter your email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <CardActions>
//         <Button size="small">Get Access</Button>
//         <Button size="small" onClick={handlePurchase}>Buy Insight</Button>
//       </CardActions>
//         {apiKey && (
//         <div>
//           <p>🎉 Purchase Complete!</p>
//           <p>🔑 Your API Key: <code>{apiKey}</code></p>
//           <p>Use it to call: <code>/diagnosis-by-age</code></p>
//         </div>
//       )}
//     </Card>
    
//   );
// }

// export default Cardcomp;

import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
// axios is no longer needed if we're not hitting a key-generation endpoint
// import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import imgs from "./assets/man-giving-bar-graph-presentation-using-high-technology-digital-pen.jpg"
import avtr from "./assets/941050_ODHMJY0(1).jpg"

// 1. Define an interface for your component's props,
//    including the specific endpoint path and its corresponding API key
interface CardcompProps {
  title: string;
  text: string;
  endpointPath: string; // e.g., "/diagnoses" or "/average_length_of_stay"
  apiKey: string;     // The pre-defined API key for this specific endpoint
}

// 2. Type the functional component using React.FC and your props interface
const Cardcomp: React.FC<CardcompProps> = ({ title, text, endpointPath, apiKey }) => {
  // Use a state to control whether the API key is displayed
  const [showKey, setShowKey] = useState<boolean>(false);

  const handleGetAccess = () => {
    // When "Get Access" is clicked, simply reveal the key
    setShowKey(true);
    // In a real marketplace, this might involve a payment gateway,
    // sending email, or logging access, but for this example, we just reveal.
  };

  return (
    <Card sx={{ maxWidth: 345, m: 2 }}> {/* Added margin for better visual separation */}
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          // You might want to make this image dynamic based on endpointPath or props
          image={imgs} // Placeholder image
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Stack>
            <p>Provided by: Mathematica's Data Innovation Lab</p>
            <Avatar alt="Remy Sharp" src={avtr}></Avatar>
          </Stack>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {text}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* Removed email input as we're not dynamically generating keys via email */}
        <Button size="small" variant="contained" onClick={handleGetAccess}>
          Get Access Key
        </Button>
        <p>99.99$</p>
      </CardActions>
      {showKey && (
        <CardContent>
          <Typography variant="body2" color="success.main" sx={{ mt: 2 }}>
            🎉 Access Granted!
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            🔑 Your API Key: <code style={{ wordBreak: 'break-all' }}>{apiKey}</code>
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Use it to call the endpoint: <code style={{ wordBreak: 'break-all' }}>{endpointPath}</code>
          </Typography>
        </CardContent>
      )}
    </Card>
  );
};

export default Cardcomp;