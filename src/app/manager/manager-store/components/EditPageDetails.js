'use client'
// Third-party
import { Editor } from '@tinymce/tinymce-react';
import React, { useRef, useState, useEffect } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// In the project
import store from '@/lib/features/storeSlice'
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import PreviewPage from './EditPageDetails/PreviewPage'
import useControllerStore from '@/hook/manager/useControllerStore'

export default function TinyMCE() {

  const dispatch = useAppDispatch()
  const { setIsChangeDetail } = useControllerStore()

  let contentToRedux = useAppSelector((state) => state.reducer.store.content)

  let [content, setContent] = useState()

  useEffect(() => {
    setContent(contentToRedux)
  }, [contentToRedux])

  const editorRef = useRef(null);

  const handleClickDemo = () => {
    if (editorRef.current) {
      const editorContent = editorRef.current.getContent();
      dispatch(store.actions.onChangeContent(editorContent))
      console.log(editorContent);
    }
  }

  const saveToRedux = () => {
    if (editorRef.current) {
      const editorContent = editorRef.current.getContent();
      setIsChangeDetail(true)
      dispatch(store.actions.onChangeContent(editorContent));
    }
  }

  return (
    //defaultExpanded
    <Accordion
      sx={{
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)',
      }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography variant='h6' sx={{ fontWeight: 500 }}>
          Quản lý danh trang mô tả cửa hàng
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction={'column'} spacing={1}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <PreviewPage handleClickDemo={handleClickDemo}></PreviewPage>
          </Box>
          <Editor
            apiKey='qzmvb0bq15jpqiwg6dv4jdxu9zhkhkqfw3dt6qxfvx61j7y4'
            onInit={(evt, editor) => editorRef.current = editor}
            onChange={(content, editor) => {
              saveToRedux()
            }}
            initialValue={content}
            init={{
              height: 600,
              plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker',
              toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
            }}
          />
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
