import React, { useState } from 'react';

const Comprehension = ({ onSave }) => {
    const [instructions, setInstructions] = useState('');
    const [passage, setPassage] = useState('');
    const [media, setMedia] = useState('');
    const [questions, setQuestions] = useState([]);

    const addQuestion = () => {
        setQuestions([
            ...questions,
            { question: '', type: 'Short Text', options: [] }
        ]);
    };

    const updateQuestion = (index, field, value) => {
        const updatedQuestions = [...questions];
        if (field === 'question') {
            updatedQuestions[index].question = value;
        } else if (field === 'type') {
            updatedQuestions[index].type = value;
        }
        setQuestions(updatedQuestions);
    };

    const updateOptions = (questionIndex, optionIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options[optionIndex] = value;
        setQuestions(updatedQuestions);
    };

    const deleteOption = (questionIndex, optionIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options = updatedQuestions[questionIndex].options.filter(
            (_, index) => index !== optionIndex
        );
        setQuestions(updatedQuestions);
    };

    const saveQuestion = () => {
        onSave({
            type: 'Comprehension',
            data: { instructions, passage, media, questions }
        });
    };

    return (
        <div className="p-4 border rounded-md shadow-sm my-4">
            <h2 className="font-bold text-lg mb-2">Comprehension</h2>
            <textarea
                className="w-full border rounded-md p-2 mb-2"
                placeholder="Enter instructions for the comprehension"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
            />
            <textarea
                className="w-full border rounded-md p-2 mb-2"
                placeholder="Enter the passage or content here"
                value={passage}
                onChange={(e) => setPassage(e.target.value)}
            />
            <input
                type="text"
                className="w-full border rounded-md p-2 mb-2"
                placeholder="Media URL (optional)"
                value={media}
                onChange={(e) => setMedia(e.target.value)}
            />
            <h3 className="font-medium mb-1">Questions</h3>
            {questions.map((q, qIndex) => (
                <div key={qIndex} className="border p-2 mb-2">
                    <textarea
                        className="w-full border rounded-md p-2 mb-2"
                        placeholder={`Question ${qIndex + 1}`}
                        value={q.question}
                        onChange={(e) =>
                            updateQuestion(qIndex, 'question', e.target.value)
                        }
                    />
                    <select
                        className="w-full border rounded-md p-2 mb-2"
                        value={q.type}
                        onChange={(e) =>
                            updateQuestion(qIndex, 'type', e.target.value)
                        }
                    >
                        <option value="Short Text">Short Text</option>
                        <option value="MCQ">Multiple Choice Question (MCQ)</option>
                        <option value="MCA">Multiple Correct Answers (MCA)</option>
                    </select>
                    {q.type !== 'Short Text' && (
                        <>
                            <h4 className="font-medium mb-1">Options</h4>
                            {q.options.map((opt, optIndex) => (
                                <div key={optIndex} className="flex items-center mb-2">
                                <input
                                    key={optIndex}
                                    type="text"
                                    className="border rounded-md p-1 w-full mb-2"
                                    placeholder={`Option ${optIndex + 1}`}
                                    value={opt}
                                    onChange={(e) =>
                                        updateOptions(qIndex, optIndex, e.target.value)
                                    }
                                />
                                <button
                                        className="ml-2 bg-red-500 text-white p-1 rounded"
                                        onClick={() => deleteOption(qIndex, optIndex)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                            <button
                                className="bg-blue-500 text-white py-1 px-4 rounded"
                                onClick={() =>
                                    setQuestions((prevQuestions) => {
                                        const updated = [...prevQuestions];
                                        updated[qIndex].options.push('');
                                        return updated;
                                    })
                                }
                            >
                                Add Option
                            </button>
                        </>
                    )}
                </div>
            ))}
            <button
                className="bg-blue-500 text-white py-1 px-4 rounded"
                onClick={addQuestion}
            >
                Add Question
            </button>
            <button
                className="bg-green-500 text-white py-1 px-4 rounded ml-2"
                onClick={saveQuestion}
            >
                Save Comprehension
            </button>
        </div>
    );
};

export default Comprehension;
