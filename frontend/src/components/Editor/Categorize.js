import React, { useState } from 'react';

const Categorize = ({ onSave }) => {
    const [categories, setCategories] = useState(['']);                     // Initialize with one empty category
    const [items, setItems] = useState([{ name: '', category: '' }]);       // Initialize with an object containing name and category

    // Add new category
    const addCategory = () => {
        setCategories([...categories, '']);
    };

    // Add new item
    const addItem = () => {
        setItems([...items, { name: '', category: '' }]);
    };

    // Update category name
    const handleCategoryChange = (index, value) => {
        const updatedCategories = [...categories];
        updatedCategories[index] = value;
        setCategories(updatedCategories);
    };

    // Update item name
    const handleItemChange = (index, field, value) => {
        const updatedItems = [...items];
        updatedItems[index][field] = value;
        setItems(updatedItems);
    };

    // Save the question
    const saveQuestion = () => {
        if (!categories.length || !items.length) {
            alert('Please add at least one category and one item.');
            return;
        }
        onSave({
            type: 'Categorize',
            data: { categories, items },
        });
    };

    return (
        <div className="p-4 border rounded-md shadow-sm my-4">
            <h2 className="font-bold text-lg mb-4">Categorize Question</h2>

            {/* Categories Section */}
            <h3 className="font-medium mb-2">Categories:</h3>
            {categories.map((category, index) => (
                <div key={index} className="flex items-center mb-2">
                    
                    <input
                        type="text"
                        className="border rounded-md p-2 flex-grow mr-2"
                        placeholder={`Category ${index + 1}`}
                        value={category}
                        onChange={(e) => handleCategoryChange(index, e.target.value)}
                    />
                    <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() =>
                            setCategories(categories.filter((_, i) => i !== index))
                        }
                    >
                        Delete
                    </button>
                </div>
            ))}
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={addCategory}
            >
                Add Category
            </button>

            {/* Items Section */}
            <h3 className="font-medium mt-4 mb-2">Items to Categorize:</h3>
            {items.map((item, index) => (
                <div key={index} className="flex items-center mb-2">
                    <input
                        type="text"
                        className="border rounded-md p-2 flex-grow mr-2"
                        placeholder={`Item ${index + 1}`}
                        value={item.name}
                        onChange={(e) =>
                            handleItemChange(index, 'name', e.target.value)
                        }
                    />
                    <select
                        className="border rounded-md p-2 flex-grow"
                        value={item.category}
                        onChange={(e) =>
                            handleItemChange(index, 'category', e.target.value)
                        }
                    >
                        <option value="">Select Category</option>
                        {categories.map((category, catIndex) => (
                            <option key={catIndex} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    <button
                        className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                        onClick={() => setItems(items.filter((_, i) => i !== index))}
                    >
                        Delete
                    </button>
                </div>
            ))}
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={addItem}
            >
                Add Item
            </button>

            {/* Save Button */}
            <div className="mt-4">
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={saveQuestion}
                >
                    Save Question
                </button>
            </div>
        </div>
    );
};

export default Categorize;
