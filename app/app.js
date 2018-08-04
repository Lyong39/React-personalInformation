import React from "react";
import ReactDOM from "react-dom";
import StyleEditor from "./StyleEditor.js";
import ResumeEditor from "./ResumeEditor.js";
import "./style/reset.css";
import Prism from "prismjs";
import co from "co";

class ReactClass extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			style: "",
		};
		this.interval = 40;
		this.resumeEditorContent = `
# 杀猪老板的简历

## 个人信息

	1. 技能：
	
		kotlin,springBoot,springCloud,springDataJPA,mysql,html，css，javaScript,
		
		solidity，nodejs，vue，react以上都是某大哥教过的技术，一顿学习之后我只记得main方法..
		
	2. 生活：
	
		乒乓球,篮球,游泳,漂移板,跑步,健身，电影,美食，以及各种舒适安逸的生活，唉! 到最后变乞丐了..
		
		游戏玩家 喜欢各种游戏，手游，网游，单机游，是兄弟就来玩贪玩蓝月~


    **------------------------------------别走开，广告之后更精彩！**


## 这是广告

**慧江电竞金枪**:
              一个打王者荣耀讨生活的男人      QQ:654074610 


**个人生涯**: 虎牙直播签约主播

             国服最强诸葛亮
             
             S3赛季开始入手王者荣耀，连续十赛季荣耀王者,赛季最高77星
             
             进全区前五毫无压力，侵占野区快准狠具有野区霸主的称号。

			 现职业代练，没有什么单接不了！钱到位玻璃都干碎！


#-------------------------代练加Q质量高效价格优惠，做打手几十载赛季妥妥的，表哥表姐表弟表妹qq加起来~#
#----------------------注意!!! 以上不是吹水,真实有效 请各位宝宝加打手QQ直接搞--------------------------#
#----------------------打手若忙也可加我QQ:563939142;一夜变王者,我用双手成就你的梦想！------------------#
> 装逼吹水卖萌无所不能，如果你喜欢这个效果，各位老板送个飞机吧 实在不行办张卡也行啊  嘿嘿额...  `;

		
		this.styleEditorContent = [`/*
* 大家好, 我是杀猪老板板板板板板板板板板板板板板板板板板板板板板板板板板板板板板板板板板板板板板板板板板的字幕员解说员...
*
* 这是在网上搬下来用react搞得个人动态简历，没有搞服务器面试官是看不了了 老衲只好拿来对付第三次演讲 如果还能抽到本老板的话。。
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
/*文字直接显示在页面上，没有任何装饰，装修一下，所以我们来给文字加点装饰吧~~ */
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
/* 不行！我作为一个给区块链的程序员的杀猪老板干活的字幕员解说员，怎么也得镀个金什么的，让你们都爱上我~~ */
.token.comment{ color: #FAFF72; font-style: italic; }
.token.selector{ color: #E86E75; }
.token.property{ color: #F78C6C; }
.token.punctuation{ color: #88DCFE; }
.token.function{ color: #82AAFF; }
/* 为了更加地酷炫一点，再加一点杀猪式 3D 效果！ */
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
/* 再对 本老板的简历 加点样式 */
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