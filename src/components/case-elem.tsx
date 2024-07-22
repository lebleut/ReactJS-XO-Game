import { Box, IconButton, Stack, SxProps } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { caseConf, Element, NineElements } from "../settings";

interface Props {
    item: Element;
    itemIndex: number;
    current: Element["player"];
    setHasPlayedIndex?: (index: number) => void;
    playerWins: Element["player"] | null;
    wonCases: number[] | null;
}

function CaseElem({ item, itemIndex, current, setHasPlayedIndex, playerWins, wonCases }: Props) {
    const sx: SxProps = {
        fontSize: { xs: (caseConf.size / 2) * 0.8, sm: caseConf.size * 0.8 },
        color: item.player == "o" ? caseConf.oColor : caseConf.xColor,
    };
    const emptySx: SxProps = {
        ...sx,
        color: "gray",
        opacity: 0,
        "&:hover": {
            opacity: 0.5,
        },
    };
    function handleClick() {
        if (setHasPlayedIndex) {
            setHasPlayedIndex(itemIndex);
        }
    }
    function getIcon(item: Element) {
        if (!item.player) {
            return (
                <IconButton disabled={playerWins !== null} onClick={handleClick}>
                    {current == "o" ? <RadioButtonUncheckedIcon sx={emptySx} /> : <CloseIcon sx={emptySx} />}
                </IconButton>
            );
        }
        return item.player == "o" ? <RadioButtonUncheckedIcon sx={sx} /> : <CloseIcon sx={sx} />;
    }
    return (
        <Stack
            className={"xo-case"}
            direction={"row"}
            sx={{
                outline: "2px #f3f3f3 solid",
            }}
        >
            <Box
                bgcolor={
                    wonCases &&
                    wonCases.find((cIndex) => {
                        cIndex === itemIndex && console.log(cIndex, itemIndex);
                        return cIndex === itemIndex;
                    }) !== undefined
                        ? "#8BC34A"
                        : "white"
                }
            >
                {getIcon(item)}
            </Box>
        </Stack>
    );
}
export default CaseElem;
