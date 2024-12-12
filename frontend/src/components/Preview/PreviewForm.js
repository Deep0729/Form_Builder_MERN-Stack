import React from 'react';

const PreviewForm = ({ form }) => {
    if (!form) {
        return <p>No form to preview. Please create a form first.</p>;
    }

    const renderQuestion = (question, index) => {
        switch (question.type) {
            case 'Categorize':
                return (
                    <div key={index} className="mb-6">
                        <h3 className="font-bold mb-2">Categorize Question</h3>
                        <p className="mb-2">Categories: {question.data.categories.join(', ')}</p>
                        <p className="mb-2">Items to categorize:</p>
                        <ul className="list-disc ml-6">
                            {question.data.items.map((item, idx) => (
                                <li key={idx}>
                                    <strong>Item:</strong> {item.name}, <strong>Category:</strong> {item.category}
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            case 'Cloze':
                return (
                    <div key={index} className="mb-6">
                        <h3 className="font-bold mb-2">Cloze Question</h3>
                        <p>{question.data.sentence}</p>
                        <p className="mt-2">Options:</p>
                        <ul className="list-disc ml-6">
                            {question.data.options.map((option, idx) => (
                                <li key={idx}>{option}</li>
                            ))}
                        </ul>
                    </div>
                );
            case 'Comprehension':
                return (
                    <div key={index} className="mb-6">
                        <h3 className="font-bold mb-2">Comprehension</h3>
                        <p className="italic mb-2">Instructions: {question.data.instructions}</p>
                        <p className="mb-2">{question.data.passage}</p>
                        {question.data.media && (
                            <img
                                src={question.data.media}
                                alt="Comprehension Media"
                                className="mb-4 rounded-md max-w-full"
                            />
                        )}
                        <div>
                            {question.data.questions.map((q, qIndex) => (
                                <div key={qIndex} className="mb-4">
                                    <p className="font-medium">{q.question}</p>
                                    {q.type === 'Short Text' && <input type="text" className="border p-2 w-full" />}
                                    {q.type !== 'Short Text' && (
                                        <ul className="list-disc ml-6">
                                            {q.options.map((option, optIndex) => (
                                                <li key={optIndex}>{option}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="p-6 border rounded-md shadow-sm">
            <h2 className="text-2xl font-bold mb-4">{form.title}</h2>
            {form.headerImage && (
                <img
                    src={form.headerImage}
                    alt="Header"
                    className="mb-6 w-full h-auto rounded-md"
                />
            )}
            <div>
                {form.questions && form.questions.length > 0 ? (
                    form.questions.map((question, index) => renderQuestion(question, index))
                ) : (
                    <p>No questions added yet.</p>
                )}
            </div>
        </div>
    );
};

export default PreviewForm;
