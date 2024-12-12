import React, { useState } from 'react';
import Categorize from '../components/Editor/Categorize';
import Cloze from '../components/Editor/Cloze';
import Comprehension from '../components/Editor/Comprehension';
import PreviewForm from '../components/Preview/PreviewForm';
import axios from 'axios';

const FormEditor = () => {
    const [questions, setQuestions] = useState([]);
    const [form, setForm] = useState({
        title: '',
        headerImage: '',
        questions: [],
    });

    // Add a new question to the form
    const addQuestion = (question) => {
        setForm((prevForm) => ({
            ...prevForm,
            questions: [...prevForm.questions, question],
        }));
    };

    // Save the form to backend
    const saveForm = async () => {
        if (!form.title.trim()) {
            alert('Form title is required!');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/forms', form);
            alert('Form saved successfully!');
            console.log('Saved Form:', response.data);
        } catch (error) {
            console.error('Error saving form:', error);
            alert('Failed to save form. Please try again.');
        }
    };

    // Reset form for creating new 
    const createNewForm = () => {
        setForm({
            title: '',
            headerImage: '',
            questions: [],
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col p-6">
            <h1 className="text-2xl font-bold mb-4">Form Editor</h1>

            <button
                onClick={createNewForm}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
            >
                Create New Form
            </button>

            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-md shadow-md">
                    <h2 className="text-lg font-semibold mb-4">Edit Form</h2>

                    {/* Form Title */}
                    <input
                        type="text"
                        className="w-full border border-gray-300 p-2 rounded-md mb-4"
                        placeholder="Form Title"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                    />

                    {/* Header Image */}
                    <input
                        type="text"
                        className="w-full border border-gray-300 p-2 rounded-md mb-4"
                        placeholder="Header Image URL"
                        value={form.headerImage}
                        onChange={(e) => setForm({ ...form, headerImage: e.target.value })}
                    />

                    
                    <Categorize onSave={addQuestion} />
                    <Cloze onSave={addQuestion} />
                    <Comprehension onSave={addQuestion} />

                    <button
                        onClick={saveForm}
                        className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
                    >
                        Save Form
                    </button>
                </div>

                
                <div className="p-4 bg-white rounded-md shadow-md">
                    <h2 className="text-lg font-semibold mb-4">Form Preview</h2>
                    <PreviewForm form={form} />
                </div>
            </div>
        </div>
    );
};

export default FormEditor;
