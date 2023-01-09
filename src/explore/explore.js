
import Header from "../common/header"
import Footer from "../common/footer"
import React from "react";
import request from "../utils/request";
import { RightSvg } from "../components/Svg";
import { staticUrl } from "../utils/utils";
import { withTranslation } from "react-i18next";
import "./explore.css"


class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      perPage: 10,
      totalPages: 99,
      userList: [],
      currentField: 0,
      selectedTags: [],
      fields: [],
      tags: [],
      isLoading: false,
      hasMore: true,
      isEn: true,
      inputValue: "",
    }
    this.handleScroll = this.handleScroll.bind(this);
  }

  getFields = () => {
    request({
      url: "/setting/fields",
      method: "GET",
    }).then(res => {
      if (res && res.data) {
        console.log(res.data)
        this.setState({ fields: res.data });
      }
    })
  }

  getTags() {

    let url = "/setting/tags/default/en"
    if (localStorage.getItem("i18nextLng") === "zh" || localStorage.getItem("i18nextLng") === "zh-CN") {
      url = "/setting/tags/default/zh"
    }

    request({
      url: url,
      method: "GET",
    }).then (res => {
      if (res && res.data) {
        //console.log(res.data)
        this.setState({ tags: res.data });
      } 
    })
  }

  isEnglish() {
    localStorage.getItem("i18nextLng") === "en" ? this.setState({ isEn: true }) : this.setState({ isEn: false });
  }

  init() {
    // 判断语言
    this.isEnglish();
    // 获取字段信息
    this.getFields();
    // 获取标签信息
    this.getTags();
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
      let { page, perPage, currentField, selectedTags} = this.state;
      if (page === 0) {
        this.setState({ isLoading: false });
        return;
      }

      let tags_name = selectedTags.map(item => item.name);
      request({
        url: `/setting/explore?page=${page}&limit=${perPage || 10}`,
        method: "POST",
        data: {field_code: currentField, tags: tags_name}
      }).then(res => {
        if (res && res.data) {
          this.setState({ totalPages: res.count, isLoading: false, userList: [...this.state.userList, ...res.data] });
        } 
      })

    })
  }

  getData() {
    this.initFilterLoad();
  }

  initFilterLoad() {
    this.setState({ page: 0, totalPages: 99, isLoading: true, userList: [] }, () => {
      this.loadMore();
    })
  }

  componentDidMount() {
    this.init();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  currentFiledIsActived(field) {
    return this.state.currentField === field.id;
  }

  currentTagIsActived(tag) {
    return this.state.selectedTags.includes(tag);
  }

  // 点击了身份信息
  handleClickField(field) {
    this.setState({ currentField: field.id }, () => {
      this.getData();
    })
    
  }

  handleInput = (e) => {
    this.setState({ inputValue: e.target.value })
  }

  // 点击标签
  handleClickTag(tag) {
    if (this.currentTagIsActived(tag)) {
      this.setState({ selectedTags: this.state.selectedTags.filter(item => item !== tag) }, ()=> {
        this.getData();
      })
    } else {
      this.setState({ selectedTags: [...this.state.selectedTags, tag] }, ()=>{
        this.getData();
      })
    }
  }

  // 按下回车键添加标签
  handleTagAdd = (e) => {
    if (e.keyCode !== 13) return;
    this.inputSearch();
  }

  inputSearch() {
    let {inputValue, tags, selectedTags} = this.state;

    if (inputValue === "") return;
    console.log("触发搜索")
    let newTag = { name: inputValue, id: tags.length + 1 }
    this.setState({ tags: [...tags, newTag] })
    this.setState({ selectedTags: [...selectedTags, newTag] }, () => {
      this.getData();
    })
    this.setState({ inputValue: "" })
  }

  render() {
    const { fields, userList, tags } = this.state;
    const { isEn } = this.state;
    const {t} = this.props;
    return (
      <div className="explore-main">
        <Header bgColor="var(--gray-bg)" />
        <div className="explore-wraper">
          <div className="explore-container header-main">
            <div className="search-keyword white-box">
              <div className="search">
                <div className="search-tool">
                <div className="search-box">
                  <input type="text" placeholder={t("explore.placeholder")} onKeyUp={this.handleTagAdd} value={this.state.inputValue} onChange={this.handleInput}></input>
                </div>
                <div className="search-submit" onClick={()=>{this.inputSearch()}}>{t("explore.search")}</div>
                </div>
                <div className="hot">
                  <div className="title">{t("explore.hot")}</div>
                  <div className="list">
                    <div className="item">ETH</div>
                    <div className="item">Web</div>
                    <div className="item">Other</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="fields white-box">
              <div className="title">{t("explore.category")}</div>
              <fieldset className="field">
                {
                  fields && fields.map((field, index) => {
                    return (
                      <div
                        className={this.currentFiledIsActived(field) ? "subitem active-subitem": "subitem"} key={index}
                        onClick={() => { this.handleClickField(field)}}
                      >
                        <span>{isEn ? field.name_en : field.name}</span>
                      </div>
                    )
                  })
                }
              </fieldset>
              <div className="title">{t("explore.tag")}</div>
              <fieldset className="tags">
                {
                  tags && tags.map((tag, index) => {
                    return (
                      <div
                      className={this.currentTagIsActived(tag) ? "subitem active-subitem": "subitem"} key={index}
                      onClick={() => {this.handleClickTag(tag)}}
                      >
                        <span>{tag.name}</span>
                      </div>
                    )
                  })
                }
              </fieldset>
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

            </div>
            {this.state.isLoading && <div className="loading">{t("explore.loading")}</div>}
            {!this.state.hasMore && <div className="no-more">{t("explore.noMore")}</div>}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default withTranslation()(Explore);


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

