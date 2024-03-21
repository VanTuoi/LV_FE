'use client'
// Third-party
import { Editor } from '@tinymce/tinymce-react';
import React, { useRef, useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// In the project
import PreviewPage from './EditPageDetails/PreviewPage'


export default function TinyMCE(props) {

  const editorRef = useRef(null);
  const { details, setDetailToDB } = props
  let [content, setContent] = useState()

  useEffect(() => {
    setContent(details)
  }, [details])

  const handleClickDemo = () => {
    if (editorRef.current) {
      const editorContent = editorRef.current.getContent();
      setDetailToDB(editorContent)
    }
  }

  const saveToRedux = () => {
    if (editorRef.current) {
      const editorContent = editorRef.current.getContent();
      setDetailToDB(editorContent);
    }
  }

  return (
    //defaultExpanded
    <Accordion defaultExpanded
      sx={{
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)',
      }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography variant='h6' sx={{ fontWeight: 500 }}>
          Mô tả cửa hàng
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction={'column'} spacing={1}>
          <Editor
            apiKey='qzmvb0bq15jpqiwg6dv4jdxu9zhkhkqfw3dt6qxfvx61j7y4'
            onInit={(evt, editor) => editorRef.current = editor}
            onChange={(content, editor) => {
              saveToRedux()
            }}
            initialValue={content}
            init={{
              height: 450,
              width: '100%',
              plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker',
              toolbar: 'undo redo | blocks| bold italic underline strikethrough | image table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <PreviewPage details={details} handleClickDemo={handleClickDemo}></PreviewPage>
          </Box>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
