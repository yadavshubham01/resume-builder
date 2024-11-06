export async function saveResume(data: any) {
    const response = await fetch('/api/resume/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return response.json();
}

export async function getResume(userId: string) {
    const response = await fetch(`/api/resume/get?userId=${userId}`);
    return response.json();
}
