import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Button from '@mui/material/Button';

export default function App() {
    const editorRef = useRef(null);
    const log = () => {
        console.log('e');
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };
    const importContentFromFile = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            const content = e.target.result;
            if (editorRef.current) {
                editorRef.current.setContent(content);
            }
        };
        reader.readAsText(file);
    };

    const exportContentToFile = () => {
        if (editorRef.current) {
            const content = editorRef.current.getContent();
            const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'editor-content.txt'; // Tên file khi tải xuống
            document.body.appendChild(link); // Thêm link vào body để có thể click
            link.click(); // Mô phỏng click để tải file
            document.body.removeChild(link); // Xóa link khỏi body sau khi tải xong
            URL.revokeObjectURL(url); // Giải phóng bộ nhớ bằng cách hủy URL tạo tạm
        }
    };
    return (
        <>
            <Editor
                apiKey='qzmvb0bq15jpqiwg6dv4jdxu9zhkhkqfw3dt6qxfvx61j7y4'
                onInit={(evt, editor) => editorRef.current = editor}
                init={{
                    plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss',
                    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                    tinycomments_mode: 'embedded',
                    tinycomments_author: 'Author name',
                    mergetags_list: [
                        { value: 'First.Name', title: 'First Name' },
                        { value: 'Email', title: 'Email' },
                    ],
                    ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                }}
                initialValue="Welcome to TinyMCE!"
            />
            <Button onClick={log}>Log editor content</Button>
            <Button onClick={exportContentToFile}>export</Button>
            <input type="file" onChange={importContentFromFile} />
        </>
    );
}