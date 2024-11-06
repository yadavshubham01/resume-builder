// components/ResumeTemplate.tsx
import { useCustomization } from '../context/CustomizationContext';

const ResumeTemplate = () => {
    const { state } = useCustomization();

    return (
        <div className="bg-white shadow-md p-6 rounded-lg" style={{ color: state.colorTheme }}>
            <h2 className="text-2xl font-bold mb-4">{state.templateType}</h2>
            {state.sections.skills && <p>Skills Section</p>}
            {state.sections.experience && <p>Experience Section</p>}
            {state.sections.education && <p>Education Section</p>}
            {state.sections.achievements && <p>Achievements Section</p>}
        </div>
    );
};

export default ResumeTemplate;
