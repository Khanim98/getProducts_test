import React from "react";
import { useGetProductsQuery, useDeleteProductMutation } from '../features/api/productsApi'

const Products = ({shouldFetch}) => {
    const [searchQuery, setSearchQuery] = React.useState(null);
    const [selectedCategory, setSelectedCategory] = React.useState("all")
    const [filteredList, setFilteredList] = React.useState([]);
    const [deleteProduct] = useDeleteProductMutation()

    const {data} = useGetProductsQuery({ skip: !shouldFetch });
    
    const search = (e) => {
        setSearchQuery(e.target.value);
    }

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    }

    const sort = (filtered, key) => {
        if (key) {
            const sorted = [...filtered];
            sorted.sort((a, b) => {
                if (a[key] > b[key]) return 1;
                if (a[key] < b[key]) return -1;
                return 0;
            });
        return sorted;
        } else {
            return filtered;
        }
        
    }


    React.useEffect(() =>{
        let filtered = [];
        if(!searchQuery){
            filtered = data?.products;
        }else{
            let searchQueryToLower = searchQuery.toLowerCase();
            filtered = data?.products.filter((product) => {
                return (product.title.toLowerCase().indexOf(searchQueryToLower) !== -1) || (product.category.toLowerCase().indexOf(searchQueryToLower) !== -1);
            })
        }
        if(selectedCategory !== "all"){
            filtered = sort(filtered, selectedCategory)
          }
       setFilteredList(filtered)
    },[data, searchQuery, selectedCategory])

    
    
    const handleDelete = async (id) => {
        try {
            const result = await deleteProduct(id);
            const deletedProduct = result.data;
            setFilteredList(filteredList.filter(product => product.id !== deletedProduct.id))
          } catch (error) {
            console.error('Failed to delete product:', error);
          }
    }
    
    return ( 
        <div className="product-page">
            <div className="filterBy">
                <div className="sort-area">
                    <select
                        name="category-list"
                        id="category-list"
                        onChange={handleCategoryChange}
                    >
                        <option value="all">All</option>
                        <option value="id">By ID</option>
                        <option value="title">By Title</option>
                        <option value="description">By Description</option>
                        <option value="price">By Price</option>
                        <option value="rating">By Rating</option>
                        <option value="stock">By Stock</option>
                        <option value="category">By Category</option>
                    </select>
                </div>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search..."
                        onChange={(e) => search(e)}
                    />
                </div>
            </div>
            <table>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Rating</th>
                        <th>Stock</th>
                        <th>Category</th>
                        <th>Delete</th>
                    </tr>
                    {data && filteredList && filteredList.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td className="table-image">
                                <img src={product.images[0]} alt="img" />
                            </td>
                            <td>{product.title}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>{product.rating}</td>
                            <td>{product.stock}</td>
                            <td>{product.category}</td>
                            <td>
                                <button onClick={() => handleDelete(product.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
 
export default Products;