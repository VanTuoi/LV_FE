import React, { useEffect, useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { Typography, Button, Box } from '@mui/material';
const data = {
  id: 'root',
  name: 'Cần Thơ',
  children: [
  ],
};

export default function RichObjectTreeView(props) {

  const { handleSelect } = props;
  const { listLocation } = props;
  if (listLocation) data.children = listLocation
  const [status, setStatus] = useState(listLocation ? true : false)

  useEffect(() => {
    if (listLocation === null) setStatus('Không tìm thấy')
    else setStatus(false)
  }, [listLocation]);

  const handleItemClick = (event, nodeId, name) => {
    console.log('Item clicked:', nodeId, name);
    handleSelect(name)      // Gọi hàm từ cha để gán vào redux
  };

  const renderTree = (nodes) => (
    status ?
      <Typography variant="h6" component="h6">
        Không tìm thấy...
      </Typography>
      :
      (
        <TreeItem
          key={nodes.id}
          nodeId={nodes.id}
          label={nodes.name}
          onClick={(event) => handleItemClick(event, nodes.id, nodes.name)} // Xác nhận khi một TreeItem được nhấp
          sx={{
            '& .MuiTreeItem-label': {
              fontSize: '1.2rem', // Điều chỉnh kích thước chữ ở đây
            },
          }}
        >
          {Array.isArray(nodes.children)
            ? nodes.children.map((node) => renderTree(node))
            : null}
        </TreeItem>
      )
  )

  return (
    <Box sx={{ minHeight: 110, maxHeight: 400, flexGrow: 1, minWidth: 200, maxWidth: 300 }}>
      <TreeView
        aria-label="rich object"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpanded={['root']}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {renderTree(data)}
      </TreeView>
    </Box >
  );
}
