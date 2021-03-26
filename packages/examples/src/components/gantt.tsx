/* eslint-disable @typescript-eslint/no-use-before-define */

import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { measureText } from "../common/measureText";
import { GanttConfig } from "../models/gantt";

type ColumnMetaData = {
  columns: {
    label: string;
    measureText?: string;
    width?: number;
    autoWidth: number;
    visible: boolean;
  }[];
  height: number;
};

const useStyles = makeStyles((_theme: Theme) => createStyles({
  ganttBox: {
    position: "relative",
  },
  box: {
    position: "relative",
    display: "grid",
    height: "100%",
    border: "1px solid #000",
    overflow: "hidden",
  },
  boxTopLeft: {
    position: "relative",
    overflow: "hidden",
  },
  boxTopRight: {
    position: "relative",
    overflow: "hidden",
  },
  boxBottomLeft: {
    position: "relative",
    overflow: "hidden",
  },
  boxBottomRight: {
    position: "relative",
    overflow: "auto",
  },
  columnHeader: {
    padding: "3px 4px 2px 4px",
    borderTop: "0 none",
    borderRight: "1px solid #444",
    borderBottom: "1px solid #444",
    borderLeft: "0 none",
    fontSize: "1.1rem",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
}));

export type GanttProps = {
  className?: string;
  data: GanttConfig;
};

export const Gantt: React.FC<GanttProps> = (props) => {
  console.log("Render Gantt");
  const { className } = props;

  const classes = useStyles();
  const [availableSize, setAvailableSize] = React.useState<ResizeObserverEntry | null>(null);
  const boxRef = React.createRef<HTMLDivElement>();
  React.useLayoutEffect(calculateAvaliableSize, []);

  const [columnMetaData, setColumnMetaData] = React.useState<ColumnMetaData>({
    columns: [
      { label: "ID", autoWidth: 0, visible: true },
      { label: "Task Name", autoWidth: 0, visible: true },
      { label: "Duration", autoWidth: 0, visible: true },
      { label: "Start", autoWidth: 0, visible: false },
      { label: "End", autoWidth: 0, visible: false },
      { label: "Completed", measureText: "C", autoWidth: 0, visible: false },
    ],
    height: 0,
  });

  const [columnWidth, columnHeight, renderedTableHeader] = React.useMemo(renderTableHeader, [availableSize, columnMetaData]);
  const renderedGridDivs = React.useMemo(renderGridDivs, [availableSize]);

  return (
    <div className={`${classes.ganttBox} ${className}`}>
      <div
        ref={boxRef}
        className={classes.box}
        style={{ gridTemplateColumns: `${columnWidth}px 1fr`, gridTemplateRows: `${columnHeight + 6}px 1fr` }}
      >
        {renderedGridDivs}
      </div>
    </div>
  );

  function calculateAvaliableSize() {
    if (!boxRef.current) {
      return () => { };
    }
    const observer = new ResizeObserver((entries) => {
      entries.some((entry) => {
        setAvailableSize(entry);
        return true;
      });
    });
    observer.observe(boxRef.current, { box: "content-box" });

    return () => {
      observer.disconnect();
    };
  }

  function renderGridDivs() {
    console.log(`renderGridDivs - Avaliable Size: ${(availableSize && `${availableSize.contentRect.width}x${availableSize.contentRect.height}`) || null}`);

    return [
      renderedTableHeader,
      <div className={classes.boxTopRight} key="div2">Weekdays</div>,
      <div className={classes.boxBottomLeft} key="div3">Table Data</div>,
      <div className={classes.boxBottomRight} key="div4">
        {`Avaliable Size: ${(availableSize && `${availableSize.contentRect.width}x${availableSize.contentRect.height}`) || null}`}
      </div>,
    ];
  }

  function renderTableHeader(): [number, number, JSX.Element] {
    let maxHeight: number = columnMetaData.height;
    let newData: boolean = false;
    const newColumnMetaData: ColumnMetaData = {
      columns: columnMetaData.columns.map((column) => {
        const columnData = { ...column };
        if (!column.autoWidth) {
          const { width, height } = measureText(column.measureText || column.label, { fontSize: 1.1, fontSizeUnit: "rem" });
          columnData.autoWidth = width;
          maxHeight = Math.max(maxHeight, height);
          newData = true;
        }
        return columnData;
      }),
      height: maxHeight,
    };
    if (newData) {
      setColumnMetaData(newColumnMetaData);
    }

    const combinedVisibleColumnWidth = newColumnMetaData.columns.reduce((acc, cur) => acc + ((cur.visible && (cur.width || cur.autoWidth) + 9) || 0), 0);
    const combinedVisibleColumnHeight = newColumnMetaData.height + 6;

    return [
      combinedVisibleColumnWidth,
      newColumnMetaData.height,
      (
        <div
          key="div1"
          className={classes.boxTopLeft}
          style={{
            width: combinedVisibleColumnWidth,
            height: combinedVisibleColumnHeight,
            backgroundColor: "pink",
            display: "flex",
          }}
        >
          {
            newColumnMetaData.columns.map((column) => (
              (
                column.visible
                && (
                  <div
                    key={column.label}
                    className={classes.columnHeader}
                    style={{ flex: `0 0 ${(column.width || column.autoWidth) + 9}` }}
                  >
                    { column.label}
                  </div>
                )
              )
              || null
            ))
          }
        </div>
      ),
    ];
  }
};
