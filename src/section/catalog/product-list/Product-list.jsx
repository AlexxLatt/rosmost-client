import ProductListItem from "../product-list-item/Product-list-item";
import './Product-list.scss';
function ProductList (props){
	const elem = props.data.map(item=>{
		const {id, ...itemProps} = item;
		return(
				<ProductListItem
				key={id}
				id = {id}
				{...itemProps}/>
		)
	})
	return(
		<ul className="productList">
			{elem}
			
		</ul>	
	)
}
export default ProductList;