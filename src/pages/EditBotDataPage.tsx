import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { getBotData } from "../services/api";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux";
import { botData } from "../models";
import { Content } from "../models";

const EditBotData: React.FC = () => {
  const [data, setBotData] = useState<botData[]>([]);
  const token = useSelector((state: RootState) => state.user.token);

  useEffect(() => {
    const fetchBotData = async () => {
      try {
        const initialData = await getBotData(token);
        setBotData(initialData);
      } catch (error) {
        console.error("Error setting bot data:", error);
      }
    };
    fetchBotData();
  }, [token]);

  const handleInputChange = (
    description: string,
    key: string,
    value: string
  ) => {
    setBotData((prevData) =>
      prevData.map((item) =>
        item.description === description
          ? {
              ...item,
              content: {
                ...item.content,
                [key]: value,
              },
            }
          : item
      )
    );
  };

  const handleNestedInputChange = (
    description: string,
    category: string,
    key: string,
    value: string
  ) => {
    setBotData((prevData) =>
      prevData.map((item) =>
        item.description === description
          ? {
              ...item,
              content: {
                ...item.content,
                [category]: {
                  ...(item.content[category] as Content),
                  [key]: value,
                },
              },
            }
          : item
      )
    );
  };

  const handleFAQChange = (description: string, key: string, value: string) => {
    setBotData((prevData) =>
      prevData.map((item) =>
        item.description === description
          ? {
              ...item,
              content: {
                FAQList: {
                  ...(item.content.FAQList as Record<string, string>),
                  [key]: value,
                },
              },
            }
          : item
      )
    );
  };

  const saveChanges = () => {
    console.log("Saved data:", data);
    // Send updated data to the backend API here.
  };

  return (
    <Box sx={{ padding: 4 }}>
      {data.map((item) => (
        <Paper key={item.id} sx={{ padding: 3, marginBottom: 4 }}>
          <Typography variant="h5" gutterBottom>
            {item.description}
          </Typography>

          {item.description === "aboutUs" && (
            <TextField
              label="About Us"
              value={item.content.text as string}
              onChange={(e) =>
                handleInputChange(item.description, "text", e.target.value)
              }
              multiline
              rows={6}
              fullWidth
              margin="normal"
            />
          )}

          {item.description === "contactUs" &&
            Object.entries(item.content).map(([key, value]) => (
              <TextField
                key={key}
                label={key}
                value={value as string}
                onChange={(e) =>
                  handleInputChange(item.description, key, e.target.value)
                }
                fullWidth
                margin="normal"
              />
            ))}

          {item.description === "products" &&
            ["loanProducts", "savingProducts"].map((category) => (
              <Box key={category} sx={{ marginBottom: 3 }}>
                <Typography variant="h6">{category}</Typography>
                {Object.entries(item.content[category] || {}).map(
                  ([key, value]) => (
                    <TextField
                      key={key}
                      label={key}
                      value={value as string}
                      onChange={(e) =>
                        handleNestedInputChange(
                          item.description,
                          category,
                          key,
                          e.target.value
                        )
                      }
                      fullWidth
                      margin="normal"
                    />
                  )
                )}
              </Box>
            ))}

          {item.description === "FAQs" &&
            Object.entries(item.content.FAQList || {}).map(([key, value]) => (
              <TextField
                key={key}
                label={key}
                value={value as string}
                onChange={(e) =>
                  handleFAQChange(item.description, key, e.target.value)
                }
                multiline
                rows={3}
                fullWidth
                margin="normal"
              />
            ))}
        </Paper>
      ))}

      <Stack direction="row" justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={saveChanges}>
          Save Changes
        </Button>
      </Stack>
    </Box>
  );
};

export default EditBotData;
