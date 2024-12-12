import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const FormFill = () => {
    const { id } = useParams();
    const [form, setForm] = useState(null);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        const fetchForm = async () => {
            const response = await axios.get(`http://localhost:5000/api/forms/${id}`);
            setForm(response.data);
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

    return (
        <div>
            {form && (
                <div>
                    <h1>{form.title}</h1>
                    {form.questions.map((q, index) => renderQuestion(q, index))}
                    <button
                        onClick={() => {
                            console.log(answers); // Save or submit the answers
                        }}
                    >
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default FormFill;
