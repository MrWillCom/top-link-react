
import Header from "../header"
import React from "react";
import request from "../utils/request";
import { RightSvg } from "../components/Svg";
import { staticUrl } from "../utils/utils";
import "./explore.css"


class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      perPage: 5,
      totalPages: 99,
      userList: [],
      currentField: 0,
      currentInterest: 0,
      fields: [],
      interests: [],
      isLoading: false,
      hasMore: true,
    }
    this.handleScroll = this.handleScroll.bind(this);
  }

  init() {
    console.log("init...")
    request({
      url: "/setting/fields",
      method: "GET",
    }).then(res => {
      this.setState({ fields: res.data })
    })
    request({
      url: "/setting/interest/primary",
      method: "GET",
    }).then(res => {
      this.setState({ interests: res.data })
    })
  }

  handleScroll() {
    let { isLoading, hasMore } = this.state;
    // 如果已经没有更多数据，则停止监听滚动事件
    if (!hasMore && isLoading) {
      return;
    }
  
    // 获取页面高度
    const { innerHeight } = window;
    // 获取页面滚动高度
    const { scrollY } = window;
    // 获取页面文档高度
    const { documentElement } = document;
    const { scrollHeight } = documentElement;
  
    // 如果滚动距离超过页面高度的一半，则加载下一页数据
    if (scrollY + innerHeight >= scrollHeight / 2) {
      this.loadMore();
    }
  }

  loadMore() {
    if (this.state.page + 1 > this.state.totalPages) {
      this.setState({ hasMore: false });
      return;
    }
    this.setState({ page: this.state.page + 1 }, () => {
      let { page, perPage, totalPages, currentField, currentInterest } = this.state;
      if (page === 0 || ( currentField === 0 && currentInterest === 0)) {
        this.setState({ isLoading: false });
        return;
      }
      console.log(currentField, currentInterest, page, perPage)
      request({
        url: `/setting/explore?field_code=${currentField}&interest_code=${currentInterest}&page=${page}&limit=${perPage}`,
        method: "GET"
      }).then(res => {
        if (res.count) {
          this.setState({ totalPages: res.count })
        }
        this.setState({ userList: this.state.userList.concat(res.data), isLoading: false })
        console.log(`loadDone: ${page}, total pages: ${totalPages}`);
      })
    })
  }

  handleFieldChange(fieldId) {
    this.state.currentField === fieldId ? this.setState({ currentField: 0 }) : this.setState({ currentField: fieldId })
    this.initFilterLoad();
  }

  initFilterLoad() {
    this.setState({ page: 0, totalPages: 99, isLoading: true, userList: [] }, () => {
      this.loadMore();
    })
  }

  handleInterestChange(interestId) {
    this.state.currentInterest === interestId ? this.setState({ currentInterest: 0 }) : this.setState({ currentInterest: interestId })
    this.initFilterLoad();
  }

  componentDidMount() {
    this.init();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    let that = this;
    let { userList, currentField, currentInterest, fields, interests } = this.state;
    return (
      <div className="explore-main">
        <Header bgColor="var(--gray-bg)" />
        <div className="explore-wraper">
          <div className="explore-container header-main">
            <div className="white-box filter-box">
              <div className="filter-title">1. 请选择身份</div>
              <div className="field-content">
                {
                  fields.map((field) => {
                    return (
                      <div className={currentField === field.id ? 'field-item active-field' : 'field-item'} key={field.id} onClick={() => { that.handleFieldChange(field.id) }}>
                        {field.name}
                      </div>
                    )
                  })
                }
              </div>

              <div className="filter-title">2. 请选择领域</div>
              <div className="field-content">
                {
                  interests.map((item) => {
                    return (
                      <div className={currentInterest === item.id ? 'field-item active-field' : 'field-item'} key={item.id} onClick={() => { this.handleInterestChange(item.id) }}>
                        {item.name}
                      </div>
                    )
                  })
                }
              </div>
            </div>
            <div className="user-box">
              {userList && userList.map((user, index) => {
                if (user) {
                  return (
                    <User user={user} key={index}></User>
                  )
                }
                return null;
              })}
              {this.state.isLoading && <div className="loading">加载中...</div>}
              {!this.state.hasMore && <div className="no-more">没有更多了</div>}
            </div>

          </div>
        </div>
      </div>
    )
  }
}
export default Explore;

function User({ user }) {
  const handleRediretToProfile = () => {
    window.open(`/${user.user_name}`)
  }
  return (
    <div className="white-box users">
      <div className="user-item">
        <div className="name">
          {user.profile_picture && <img src={staticUrl + user.profile_picture} alt="avatar"></img>}
          <div className="title">{user.page_title}</div>
        </div>
        <div className="bio">
          <p>{user.page_bio}</p>
        </div>
        <div className="link" onClick={handleRediretToProfile}>
          <RightSvg size={36}></RightSvg>
        </div>
      </div>
    </div>
  )
}

