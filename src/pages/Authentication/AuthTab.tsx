import { Box, Card, Container, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import Login from "./Login";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const AuthTab = ({ setToken }: { setToken: any }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Card sx={{ maxWidth: 450, margin: "auto" }}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label='basic tabs example'
              variant='fullWidth'
            >
              <Tab label='Log in' />
              <Tab label='Sign in' />
            </Tabs>
          </Box>{" "}
          <CustomTabPanel value={value} index={0}>
            <Login setToken={setToken} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            Item Two
          </CustomTabPanel>
        </Box>
      </Card>
    </Container>
  );
};

export default AuthTab;
