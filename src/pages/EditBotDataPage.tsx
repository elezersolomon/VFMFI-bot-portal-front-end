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
import { updateBotData } from "../services/api";
import NotificationModal from "../components/NotificationModal";
const EditBotData: React.FC = () => {
  const [data, setBotData] = useState<botData[]>([]);
  const token = useSelector((state: RootState) => state.user.token);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | "info">(
    "info"
  );
  useEffect(() => {
    const fetchBotData = async () => {
      try {
        const initialData = await getBotData(token);
        setBotData(initialData);
      } catch (error) {
        console.error("Error fetching bot data:", error);
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

  const saveChangesForItem = async (item: botData) => {
    const onSaveResponse = await updateBotData(
      token,
      item.content,
      item.description
    );
    const onclose = () => {
      setAnchorEl(null);
    };
    setMessage(onSaveResponse.message);
    setMessageType(onSaveResponse.status);
    setModalOpen(true);
  };

  return (
    <Box sx={{ padding: 4 }}>
      {data.map((item) => (
        <Paper key={item.id} sx={{ padding: 3, marginBottom: 4 }}>
          <Box sx={{ textAlign: "center", marginBottom: 2 }}>
            <Typography variant="h5">{item.description}</Typography>
          </Box>

          {item.description === "About Us" &&
            Object.entries(item.content).map(([key, value]) => (
              <TextField
                key={key}
                label={key}
                value={value as string}
                onChange={(e) =>
                  handleInputChange(item.description, key, e.target.value)
                }
                multiline
                rows={6}
                fullWidth
                margin="normal"
              />
            ))}

          {item.description === "Contact Us" &&
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
            ["savingProducts", "loanProducts"].map((category) => (
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
                      multiline
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

          <Stack
            direction="row"
            justifyContent="flex-end"
            sx={{ marginTop: 2 }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => saveChangesForItem(item)}
            >
              Save Changes
            </Button>
          </Stack>
        </Paper>
      ))}

      <Stack
        direction="row"
        justifyContent="flex-end"
        sx={{ marginTop: 4 }}
      ></Stack>
      <NotificationModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        message={message!}
        messageType={messageType}
      />
    </Box>
  );
};

export default EditBotData;
function setAnchorEl(arg0: null) {
  throw new Error("Function not implemented.");
}
