import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { Collapse } from "antd";
import "antd/dist/antd.css";
import RandomPicture from '../RandomPicture/RandomPicture'
import "./Card.scss";
const { Panel } = Collapse;

/*
<Card
    className: string;
    title: string
    titleElement: React.ReactNode
    subtitle: string
    buttonElement: React.ReactNode
    expandedElement: React.ReactNode
/>
*/

/* <Card
title={'Lighthouse Course'}
subtitle={'How to lighthouse your friends'}
expandedElement={<div><div>XXX</div><div>XXX</div><div>XXX</div><div>XXX</div><div>XXX</div><div>XXX</div><div>XXX</div><div>XXX</div><div>XXX</div><div>XXX</div><div>XXX</div><div>XXX</div></div>}
/> */

export class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  callback(expanded) {
    this.setState({ expanded: !expanded });
  }

  render() {
    const {
      title,
      titleElement,
      subtitle,
      buttonElement,
      expandedElement,
      className,
    } = this.props;
    const { expanded } = this.state;
    const header = (
      <div className={"mycard" + (expanded ? " expanded" : "")}>
        <div
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "space-between",
            marginBottom: "20px"
          }}
        >
          <div style={{ display: "flex" }}>
            <RandomPicture className={"mycard-image"}/>
            <div className={"mycard-title-container"}>
              <div className={"mycard-title"}>
                {title}
                {titleElement}
              </div>
              <div className={"mycard-subtitle"}>{subtitle}</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            {buttonElement}
            <FontAwesomeIcon
              icon={faChevronUp}
              className={"mycard-chevron" + (expanded ? " expanded" : "")}
              onClick={() => this.setState({ expanded: !expanded })}
            />
          </div>
        </div>
      </div>
    );
    return (
      <Collapse
        defaultActiveKey={["0"]}
        onChange={() => this.callback(expanded)}
        className={"my-collapse " + className}
      >
        <Panel className={"my-panel"} header={header} key="1" showArrow={false}>
          {expandedElement}
        </Panel>
      </Collapse>
    );
  }
}
