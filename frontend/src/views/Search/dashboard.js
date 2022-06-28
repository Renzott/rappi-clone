import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { handleQuery } from '../../features/autocomplete/autoCompleteSlice'
import { getAllCategories } from '../../features/categories/categoriesSlice'
import { setCategoryFind } from '../../features/products/productsSlice'



function Dashboard({ categoriesState, handleCategoryFind, handleFetchCategories }) {


    //useEffect before render
    useEffect(() => {
        handleFetchCategories();
    }, [])

    const handleClick = (categoryId) => {
        handleCategoryFind(categoryId)
    }

    const RenderCategories = () => {
        return categoriesState.categories.map(({ id, name }) => {
            return <div key={id} onClick={() => handleClick(id)}>
                <p>{name}</p>
            </div>
        })
    }

    return (
        <>
            <div onClick={() => {handleClick("")}}>
            <p>Todo</p>
            </div>
            <RenderCategories />
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        categoriesState: state.categories
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleQuery: (query) => dispatch(handleQuery(query)),
        handleCategoryFind: (category) => dispatch(setCategoryFind(category)),
        handleFetchCategories: () => dispatch(getAllCategories()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)