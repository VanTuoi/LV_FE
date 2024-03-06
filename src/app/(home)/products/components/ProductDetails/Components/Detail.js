import React, { useRef } from 'react';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Editor } from '@tinymce/tinymce-react';
export default function Detail({ tags }) {
    const [expanded, setExpanded] = React.useState(false);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };
    const toggleCompact = () => {
        setExpanded(!expanded);
    };
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };
    return (
        <Stack direction="row" spacing={1} alignItems={'center'}>
            {/* <p><span style="font-family: impact, sans-serif;">Welcome to TinyMCE!11</span></p>
            <h1><span style="font-family: impact, sans-serif;"><span style="color: rgb(241, 196, 15);">Hmmmm</span>......</span></h1>
            <> */}
            {/* <Editor
                    apiKey='qzmvb0bq15jpqiwg6dv4jdxu9zhkhkqfw3dt6qxfvx61j7y4'
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue="<p>This is the initial content of the editor.</p>"
                    init={{
                        height: '100%',
                        width: '100%',
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar: 'undo redo | formatselect | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                /> */}
            {/* <button onClick={log}>Log editor content</button> */}
            {/* </> */}
            <Typography variant="body1" align="justify" paragraph={true}>
                {expanded ? (
                    <>
                        Meticulously designed using bamboo, and featuring a vibrant, electric blue fossilized coral bar, LAVA restaurant serves the freshest seafood sourced from local fishermen each day, along with the finest cuts of imported beef.
                        <br />
                        Situated in a refined and elegant beachfront setting, the atmosphere at our signature restaurant is warm and relaxed, extending to the serene outdoor terrace where the beach side seating arrangement is light, relaxed, and perfect for a romantic sunset aperitif
                        <br />
                        The extensive wine collection includes both old world classics and crisp new world wines. For those seeking a more intimate dinner venue, LAVA also offers private dining rooms downstairs.
                        <br />
                        For more information regarding to LAVA restaurant, kindly email to dining.concierge@icphuquoc.com
                        <Button variant="text" sx={{ color: 'red' }} onClick={toggleExpanded}>ẩn bớt</Button>
                    </>
                ) : (
                    <>
                        Meticulously designed using bamboo, and featuring a vibrant, electric blue fossilized coral bar, LAVA restaurant serves the freshest seafood sourced from local fishermen each day, along with the finest cuts of imported beef.
                        <br />
                        Situated in a refined and elegant beachfront setting, the atmosphere at our signature restaurant is warm and relaxed, extending to the serene outdoor terrace where the beach side seating arrangement is light, relaxed, and perfect for a romantic sunset aperitif....
                        <Button variant="text" onClick={toggleExpanded}>xem thêm</Button>
                    </>
                )}
            </Typography>
        </Stack>
    );
}
