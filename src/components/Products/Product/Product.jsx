import React from "react";
import {
	Card,
	CardMedia,
	CardContent,
	CardActions,
	Typography,
	IconButton,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";

import useStyles from "./styles";

const Product = ({ product, onAddToCart }) => {
	const classes = useStyles();
	const colors = [
		"#80ffdb",
		"#dee2e6",
		"#f9bec7",
		"#e07a5f",
		"#83c5be",
		"#a5a58d",
		"#c77dff",
		"#4361ee",
		"#007f5f",
		"#ff595e",
		"#ffff3f",
		"#ffa69e",
		"#656d4a",
		"#a47148",
		"#f5dd90",
		"#60d394",
		"#14746f",
		"#f7fff7",
		"#ff206e",
		"#00c49a",
		"#bf4342",
		"#b7ce63",
		"#ff8c42",
	];

	return (
		<Card
			style={{
				backgroundColor: colors[Math.floor(Math.random() * colors.length)],
			}}
			className={classes.root}
		>
			<CardMedia
				className={classes.media}
				image={product.media.source}
				title={product.name}
			/>
			<CardContent>
				<div className={classes.cardContent}>
					<Typography variant="h5" gutterBottom>
						{product.name}
					</Typography>
					<Typography variant="h5">
						{product.price.formatted_with_symbol}
					</Typography>
				</div>
				<Typography
					dangerouslySetInnerHTML={{ __html: product.description }}
					variant="body2"
					color="textSecondary"
				/>
			</CardContent>
			<CardActions disableSpacing className={classes.cardActions}>
				<IconButton
					aria-label="Add to Cart"
					onClick={() => onAddToCart(product.id, 1)}
				>
					<AddShoppingCart />
				</IconButton>
			</CardActions>
		</Card>
	);
};

export default Product;
