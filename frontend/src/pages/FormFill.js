import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const FormFill = () => {
    const { id } = useParams();
    const [form, setForm] = useState(null);
    const [answers, setAnswers] = useState({});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchForm = async () => {
            try{
                const response = await axios.get(`https://form-builder-mern-stack.onrender.com/api/forms/${id}`);
                setForm(response.data);
            } catch (err) {
            console.error('Error fetching form:', err);
            setError('Failed to load the form. Please try again later.');
            }
        };
        fetchForm();
    }, [id]);

    const handleAnswerChange = (questionIndex, value) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionIndex]: value,
        }));
    };

    const renderQuestion = (q, index) => {
        switch (q.type) {
            case 'Cloze':
                return (
                    <div key={index}>
                        <h3>{q.data.sentence}</h3>
                        {q.data.options.map((option, optIndex) => (
                            <input
                                key={optIndex}
                                type="text"
                                placeholder={`Option ${optIndex + 1}`}
                                value={answers[index]?.[optIndex] || ''}
                                onChange={(e) => handleAnswerChange(index, e.target.value)}
                            />
                        ))}
                    </div>
                );
            case 'MCQ':
            case 'MCA':
                return (
                    <div key={index}>
                        <h3>{q.data.question}</h3>
                        {q.data.options.map((option, optIndex) => (
                            <div key={optIndex}>
                                <input
                                    type="checkbox"
                                    value={option}
                                    checked={answers[index]?.includes(option) || false}
                                    onChange={(e) => {
                                        const newAnswers = [...(answers[index] || [])];
                                        if (e.target.checked) {
                                            newAnswers.push(option);
                                        } else {
                                            const optionIndex = newAnswers.indexOf(option);
                                            if (optionIndex > -1) {
                                                newAnswers.splice(optionIndex, 1);
                                            }
                                        }
                                        handleAnswerChange(index, newAnswers);
                                    }}
                                />
                                {option}
                            </div>
                        ))}
                    </div>
                );
            case 'Short Text':
                return (
                    <div key={index}>
                        <h3>{q.data.question}</h3>
                        <input
                            type="text"
                            value={answers[index] || ''}
                            onChange={(e) => handleAnswerChange(index, e.target.value)}
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    const submitAnswers = async () => {
        try {
            setError('');
            setSuccess('');
            const response = await axios.post(`https://form-builder-mern-stack.onrender.com/api/forms/${id}/responses`, {
                answers,
            });
            setSuccess('Your responses have been submitted successfully!');
            console.log('Submission Response:', response.data);
        } catch (err) {
            console.error('Error submitting answers:', err);
            setError('Failed to submit your responses. Please try again.');
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {success && <div className="text-green-500 mb-4">{success}</div>}

            {form ? (
                <div>
                    <h1 className="text-2xl font-bold mb-4">{form.title}</h1>
                    {form.headerImage && (
                        <img
                            src={form.headerImage}
                            alt="Form Header"
                            className="w-full max-h-64 object-cover rounded-md mb-6"
                        />
                    )}
                    {form.questions.map((q, index) => renderQuestion(q, index))}
                    <button
                        onClick={submitAnswers}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                    >
                        Submit
                    </button>
                </div>
            ) : (
                <div>Loading form...</div>
            )}
        </div>
    );
};


export default FormFill;
