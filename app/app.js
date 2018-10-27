import React from "react";
import ReactDOM from "react-dom";
import StyleEditor from "./StyleEditor.js";
import ResumeEditor from "./ResumeEditor.js";
import "./style/reset.css";
import Prism from "prismjs";
import co from "co";
import Prism from "prismjs";

class ReactClass extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			style: "",
		};
		this.interval = 40;
		this.resumeEditorContent = `
# 个人小简历

## 个人信息

		姓　  名： 刘勇							性   别 ： 男
	
		籍    贯： 江西赣州						修炼年限： 2年
		
		目标职能：JAVA，区块链开发
		
		目标地点：杭州

	1. 玩具
	
		SpringBoot，SpringCloud，SpringMVC，Spring，MyBatis，mysql，
		
		html，css，solidity，javaScript，nodejs，vue，react
		
	2. 生活
	
		乒乓球,篮球,游泳,漂移板,跑步,健身，电影,美食，以及各种舒适的生活，唉! 到最后变乞丐了..
		
		
		游戏玩家 喜欢过各种游戏，手游，网游，单机游，是兄弟就来砍我！我在贪玩蓝月等你~
		
		
		-----等一下!!!
		
		----'我'----不信！
		
		程序员还有时间玩游戏？我信你个鬼你这老头坏的很，敢发誓粪池蝶泳么？
		嗯？你咋老拆我台昵...

>大家喜欢这个效果吗，地址在这你懂得 ：https://github.com/Lyong39/React-personalInformation

> 告诉你一件事，到这里并没有结束，继续继续，嘿嘿额...  `;

		
		this.styleEditorContent = [`/*
* 大家好,
*
* 这是react版的个人动态简历，挺好玩的
*
* 希望大家能够喜欢 :)
*/

/* 所以我们就开始吧！首先给所有元素加上过渡效果 */
* {
-webkit-transition: all .3s;
transition: all .3s;
}
/* 白色背景太单调了，我们来点背景，给Html加点样式~~ */
html {
color: rgb(222,222,222); background: #425261; 
}
/*文字直接显示在页面上，没有任何装饰，所以我们来给文字加点装饰吧~~ */
.styleEditor {
  white-space: pre-wrap;
  pisition: fixed; left: 0; top: 0;
  background-color: #303030;
  padding: .5em;
  border: 1px solid;
  margin: .5em;
  overflow: auto;
  width: 45vw; height: 90vh;
}
/* 再打扮一下，看好了我会发光哦~~ */
.token.comment{ color: #FAFF72; font-style: italic; }
.token.selector{ color: #E86E75; }
.token.property{ color: #F78C6C; }
.token.punctuation{ color: #88DCFE; }
.token.function{ color: #82AAFF; }
/* 跳支舞吧，苏喂苏喂苏喂~ */
.token.comment{
	font-style: normal; font-style: italic; 
	font-style: normal; font-style: italic;
	font-style: normal;
}
/* 为了更加地酷炫一点，再加一点 3D 效果！ */
html{
-webkit-perspective: 1000px;
perspective: 1000px;
}
.styleEditor {
position: fixed; left: 0; top: 0; 
-webkit-transition: none; 
transition: none;
-webkit-transform: rotateY(10deg) translateZ(-100px) ;
transform: rotateY(10deg) translateZ(-100px) ;
}
/* 不知道对以上代码框的修改你是否喜欢呢？ */

/* 接下来我给自己准备一个编辑器，用来放我的简历内容 */
.resumeEditor{
position: fixed; right: 0; top: 0;
padding: .5em;  margin: .5em;
width: 48vw; height: 90vh; 
border: 1px solid;
background: white; color: #222;
overflow: auto;
}

/* 好了，我要开始写简历了 */
`,
`
/* 这个简历好丑，好像差点什么
* 对了，这是 Markdown 格式的，让我来把她变漂亮吧
* --------开始作法----------米西米西 滑不拉几 如果你不拉稀 我就不能米西...
*           3          
*           2          
*           1          
*          啦啦啦！
*/
`,
`
/* 再对 我的简历 加点样式 */
.resumeEditor{
padding: 2em;
}
.resumeEditor h1{
display: block;
width: 80px;
margin: 0 auto;
}
.resumeEditor h2{
display: inline-block;
border-bottom: 1px solid;
margin: 1em 0 .5em;
}
.resumeEditor h3{
display: inline-block;
margin: 0.5em 0;
}
.resumeEditor a{
color: #000;
}
.resumeEditor ul{
list-style: none;
}
.resumeEditor ul>li::before {
content: "•";
margin-left: 1em;
margin-right: 0.5em;
}
.resumeEditor blockquote {
margin: 1em;
padding: .5em;
background: #ddd;
}
`];
	}

	addToStyle(char) {
		this.setState({
			style: this.state.style + char,
		});
	}

	replaceStyle(style) {
		this.setState({
			style: style,
		});
	}
	replaceStyleEditorContent() {
		
	}
	showStyleEditorContent(n) {
		let lastContentLength = 0;
		if (n !== 0) {lastContentLength = this.state.style.length;}
		let style = this.styleEditorContent[n];
		let len = style.length;
		return new Promise((resolve, reject) => {
			let showStyle = function () {
				let currentLen = this.state.style.length - lastContentLength;
				if (currentLen < len) {
					let char = style.substring(currentLen, currentLen+1);
					this.refs.StyleEditor.addToContent(char);
					this.addToStyle(char);
					setTimeout(showStyle, this.interval);
				} else {
					resolve();
				}
			}.bind(this);
			showStyle();
		});
	}

	showResumeContent() {
		let content = this.resumeEditorContent;
		let len = content.length;
		return new Promise((resolve, reject) => {
			let showContent = function() {
				let currentLen = this.refs.ResumeEditor.getCurrentContentLength();
				if (currentLen < len) {
					let char = content.substring(currentLen, currentLen+1);
					this.refs.ResumeEditor.addToContent(char);
					setTimeout(showContent, this.interval);
				} else {
					resolve();
				}
			}.bind(this);
			showContent();
		});
	}

	setResumeMarkdown() {
		return new Promise((resolve, reject) => {
			setTimeout(this.refs.ResumeEditor.setIsMarkdown(true), this.interval);
			resolve();
		}); 
	}
	async startShow() {
		await this.showStyleEditorContent(0).then(function() {console.log('done! show Content 0')});
		await this.showResumeContent();
		await this.showStyleEditorContent(1).then(function() {console.log('done! show Content 1')});
		await this.setResumeMarkdown();
		await this.showStyleEditorContent(2).then(function() {console.log('done! show Content 2')});
	}

	componentDidMount() {
		this.startShow();
	}

	render() {
		return (
			<div>
				<StyleEditor ref="StyleEditor" />
				<ResumeEditor ref="ResumeEditor" />
				<style>{this.state.style}</style>
			</div>);
	}
}
ReactDOM.render(<ReactClass />, document.getElementById("content"));