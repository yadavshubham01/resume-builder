
import { useCustomization } from '../context/CustomizationContext';
import { saveResume, getResume } from '../services/resumeService';
import ResumeTemplate from '../components/ResumeTemplate';
import { useEffect } from 'react';

export default function ResumeBuilder() {
    const { state, dispatch } = useCustomization();

    const handleSave = async () => {
        try {
            const userId = 'user123'; // Replace with actual user ID if available
            await saveResume({
                userId,
                templateType: state.templateType,
                colorTheme: state.colorTheme,
                sections: state.sections,
            });
            alert('Resume saved successfully!');
        } catch (error) {
            console.error('Error saving resume:', error);
            alert('Failed to save resume.');
        }
    };
    
    useEffect(() => {
        const loadResume = async () => {
            const userId = 'user123'; // Replace with actual user ID if available
            const savedResume = await getResume(userId);
            if (savedResume) {
                dispatch({ type: 'SET_TEMPLATE', payload: savedResume.templateType });
                dispatch({ type: 'SET_COLOR', payload: savedResume.colorTheme });
                Object.keys(savedResume.sections).forEach((section) => {
                    dispatch({ type: 'TOGGLE_SECTION', payload: section });
                });
            }
        };
        loadResume();
    }, [dispatch]);

    const handleDownloadPDF = async () => {
        try {
            const response = await fetch('/api/resume/pdf', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    templateType: state.templateType,
                    colorTheme: state.colorTheme,
                    sections: state.sections,
                }),
            });

            if (!response.ok) throw new Error('Failed to generate PDF');

            // Convert response to blob and create a download link
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'resume.pdf';
            link.click();
            window.URL.revokeObjectURL(url); // Clean up
        } catch (error) {
            console.error('Error downloading PDF:', error);
            alert('Failed to download resume.');
        }
    };

    const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch({ type: 'SET_TEMPLATE', payload: e.target.value });
    };

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: 'SET_COLOR', payload: e.target.value });
    };

    const handleToggleSection = (section: string) => {
        dispatch({ type: 'TOGGLE_SECTION', payload: section });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 space-y-6">
            <h1 className="text-3xl font-semibold">Customize Your Resume</h1>

            <div className="flex items-center space-x-4">
                <label>Choose Template:</label>
                <select value={state.templateType} onChange={handleTemplateChange} className="p-2 border rounded">
                    <option value="Template1">Template 1</option>
                    <option value="Template2">Template 2</option>
                </select>
            </div>

            <div className="flex items-center space-x-4">
                <label>Choose Color Theme:</label>
                <input type="color" value={state.colorTheme} onChange={handleColorChange} />
            </div>

            <div>
                <label className="block font-semibold">Toggle Sections:</label>
                {Object.keys(state.sections).map((section) => (
                    <div key={section} className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={state.sections[section]}
                            onChange={() => handleToggleSection(section)}
                        />
                        <label>{section}</label>
                    </div>
                ))}
            </div>
            
            <div className="bg-gray-200 p-4 rounded-lg shadow-inner">
                <h2 className="text-xl font-bold mb-4">Resume Preview</h2>
                <ResumeTemplate />
            </div>
            <div className='pt-2 flex justify-around'>
             <div>
               <button onClick={handleSave} className="px-6 py-3 bg-green-600 text-white rounded-md">
                Save Resume
               </button>
              </div> 
             <div> 
              <button onClick={handleDownloadPDF} className="px-6 py-3 bg-blue-600 text-white rounded-md">
                Download PDF
              </button>
             </div>
            </div>
        </div>
    );
}
