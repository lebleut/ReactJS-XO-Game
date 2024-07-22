"use client";

import { Box, Grid, IconButton, Stack, SxProps, Tooltip, Typography } from "@mui/material";
import { caseConf, Element, NineElements } from "../settings";
import CaseElem from "./case-elem";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CachedIcon from "@mui/icons-material/Cached";
import GitHubIcon from "@mui/icons-material/GitHub";

function hasPlayerWon(player: Element["player"], cases: NineElements<Element>) {
    const goodIndexes = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const list of goodIndexes) {
        if (cases[list[0]].player == player && cases[list[1]].player == player && cases[list[2]].player == player) {
            return list;
        }
    }

    return false;
}
function Header() {
    return (
        <Stack alignItems={"center"}>
            <Typography variant="h4">XO Game</Typography>
            <Typography>
                Built with :{" "}
                <a target="_blank" href="https://https://react.dev/">
                    ReactJs
                </a>
                ,{" "}
                <a target="_blank" href="https://www.typescriptlang.org/">
                    TypeScript
                </a>
                ,{" "}
                <a target="_blank" href="https://mui.com">
                    MUI
                </a>
            </Typography>
            <Tooltip title="Jamel Zarga">
                <IconButton href="https://github.com/lebleut/ReactJS-XO-Game">
                    <GitHubIcon sx={{ fontSize: 30 }} color="primary" />
                </IconButton>
            </Tooltip>
        </Stack>
    );
}
function XOGame() {
    const initCases: NineElements<Element> = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((elem) => ({ player: null })) as NineElements<Element>;
    const [current, setCurrent] = useState<Element["player"]>("x");
    const [cases, setCases] = useState<NineElements<Element>>(initCases);
    const [hasPlayedIndex, setHasPlayedIndex] = useState<number>();
    const [playerWins, setPlayerWins] = useState<Element["player"] | null>(null);
    const [wonCases, setWonCases] = useState<number[] | null>(null);

    const sx: SxProps = {
        width: { xs: (caseConf.size * 3) / 2, sm: caseConf.size * 3 },
        "& .xo-case": {
            alignItems: "center",
            justifyContent: "center",
            width: { xs: caseConf.size / 2, sm: caseConf.size },
            height: { xs: caseConf.size / 2, sm: caseConf.size },
        },
    };

    useEffect(() => {
        if (hasPlayedIndex !== undefined) {
            setCases((oldCases) => {
                oldCases[hasPlayedIndex].player = current;
                const wonC = hasPlayerWon(current, cases);
                if (wonC) {
                    setPlayerWins(current);
                    setWonCases(wonC);
                } else {
                    setCurrent((prevPlayer) => (prevPlayer == "x" ? "o" : "x"));
                }
                return oldCases;
            });
        }
    }, [hasPlayedIndex]);

    function handleReset() {
        setCurrent("x");
        setPlayerWins(null);
        setWonCases(null);
        setCases(initCases);
    }
    return (
        <Box pt={5} width={"100%"}>
            <Stack direction={"column"} spacing={3} width={"100%"}>
                <Header />

                <Grid container>
                    <Grid item display={{ xs: "none", md: "block" }} md>
                        <Stack direction={"column"} height={"100%"} alignItems="center" justifyContent="center">
                            <RadioButtonUncheckedIcon sx={{ color: caseConf.oColor, fontSize: 100, opacity: current == "o" ? 1 : 0.1 }} />
                            {playerWins && <Typography>{playerWins == "o" ? "WINS" : "FAILS"}</Typography>}
                        </Stack>
                    </Grid>

                    <Grid item xs justifyContent={"center"} display={"flex"}>
                        <Stack direction={"row"} flexWrap="wrap" sx={sx}>
                            {cases.map((item, index) => (
                                <CaseElem key={index} item={item} itemIndex={index} current={current} setHasPlayedIndex={setHasPlayedIndex} playerWins={playerWins} wonCases={wonCases} />
                            ))}
                        </Stack>
                    </Grid>

                    <Grid item display={{ xs: "none", md: "block" }} md>
                        <Stack direction={"column"} height={"100%"} alignItems="center" justifyContent="center">
                            <CloseIcon sx={{ color: caseConf.xColor, fontSize: 100, opacity: current == "x" ? 1 : 0.1 }} />
                            {playerWins && <Typography>{playerWins == "x" ? "WINS" : "FAILS"}</Typography>}
                        </Stack>
                    </Grid>
                </Grid>

                <Stack alignItems={"center"} spacing={2}>
                    <IconButton onClick={handleReset}>
                        <CachedIcon sx={{ fontSize: 50 }} />
                    </IconButton>
                </Stack>
            </Stack>
        </Box>
    );
}

export default XOGame;
