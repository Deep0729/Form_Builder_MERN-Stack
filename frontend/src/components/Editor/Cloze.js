import React, { useState } from 'react';

const Cloze = ({ onSave }) => {
    const [sentence, setSentence] = useState('');
    const [options, setOptions] = useState([]);
    const [underlinedWords, setUnderlinedWords] = useState([]);

    const handleUnderlineWord = () => {
        const words = sentence.split(' ');
        const blanks = words.filter((word) => word.startsWith('_'));
        setUnderlinedWords(blanks);
        setOptions([...options, ...blanks]);
    };

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
    };

    const deleteOption = (index) => {
        const updatedOptions = options.filter((_, i) => i !== index);
        setOptions(updatedOptions);
    };

    const saveQuestion = () => {
        onSave({
            type: 'Cloze',
            data: { sentence, options }
        });
    };

    return (
        <div className="p-4 border rounded-md shadow-sm my-4">
            <h2 className="font-bold text-lg mb-2">Cloze Question</h2>
            <textarea
                className="w-full border rounded-md p-2 mb-2"
                placeholder="Type your sentence here and use _ for blanks"
                value={sentence}
                onChange={(e) => setSentence(e.target.value)}
                onBlur={handleUnderlineWord}
            />
            <h3 className="font-medium mb-1">Options</h3>
            {options.map((option, index) => (
                <div key={index} className="flex items-center mb-2">
                <input
                    key={index}
                    type="text"
                    className="border rounded-md p-1 w-full mb-2"
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                />
                <button
                        onClick={() => deleteOption(index)}
                        className="ml-2 bg-red-500 text-white p-1 rounded"
                    >
                        Delete
                    </button>
                </div>
            ))}
            <button
                className="bg-blue-500 text-white py-1 px-4 rounded"
                onClick={() => setOptions([...options, ''])}
            >
                Add Option
            </button>
            <button
                className="bg-green-500 text-white py-1 px-4 rounded ml-2"
                onClick={saveQuestion}
            >
                Save Question
            </button>
        </div>
    );
};

export default Cloze;
