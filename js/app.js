var myNews = [
    {
        id: "1",
        author: "Mike Klein",
        text: "December 5, 2017 chess changed forever. Perhaps not only chess, but the whole world.",
        bigText: "A year ago AlphaGo program sensationally beat the world's strongest player in go, and now artificial intelligence " +
        "AlphaZero crushed the strongest rated chess engine. \n" +
        "Stockfish, which is used for home preparation by the majority of players, the winner of the TCEC 2016 Championship and " +
        "сhampionship Chess.com among computer programs in 2017, was clearly weaker. In a match of 100 parties, AlphaZero scored 28 wins with 72 draws and never lost.",
        comments: [
            {
                id: "1",
                text:  "AlphaGo Zero has not studied the history of chess for 1400 years. AlphaGo Zero model learns from scratch, playing solely with itself and " +
                "using random weights of a neural network as starting"
            },
            {
                id: "2",
                text:  "Yes, the lack of a debut book from Stockfish is in fact a serious problem."
            }
        ]
    },
    {
        id: "2",
        author: "Elon Musk",
        text: "I'm going to launch my own Tesla Roadster in space as part of the first test run of the SpaceX superheavy rocket",
        bigText: "On Friday, December 1, Elon Mask wrote in his \"Twitter\" that the new giant SpaceX rocket called Falcon Heavy " +
        "will start in January from the same NASA site, with which astronauts of Apollo 11 set out for the moon: Pad 39A in Cosmic " +
        "the center of Kennedy at Cape Canaveral, Florida.\n" +
        "As a useful load, I will use my cherry roadster Tesla, which will sound Space Oddity. The direction is the orbit of Mars. " +
        "It will stay in space for a billion years or so, if it does not explode on take-off"
    },
    {
        id: "3",
        author: "Vasiliy Lomachenko",
        text: "Rigondo was much weaker than me. He is strong in his weight class.",
        comments: [
            {
                id: "1",
                text: "Rigondeaux is a malingerer. The picture showed that there was no fracture or at least a crack."
            },
            {
                id: "2",
                text: "This is the fourth consecutive rival of Vasily, who refuses to continue the fight."
            }
        ]
    },
];

window.ee	=	new	EventEmitter();

var Comments = React.createClass({
    render: function () {
        var comments = this.props.comments;
        if(comments && comments.length > 0){
            var commentTemplate = comments.map(function (item) {
                return(
                    <li key={item.id}>
                        {item.text}
                    </li>
                )
            });
        } else {
            var commentTemplate = <li>No comments yet.</li>;
        }

        return(
            <div>{commentTemplate}</div>
        );
    }
});

var Article = React.createClass({
    propTypes:	{
        item:	React.PropTypes.shape({
            author:	React.PropTypes.string.isRequired,
            text:	React.PropTypes.string.isRequired,
        })
    },
    getInitialState: function () {
        return {
            bigTextVisible: false,
            commentsVisible: false,
        };
    },
    onReadMoreShowClick: function (e) {
        e.preventDefault();
        this.setState({bigTextVisible:	true});
    },
    onReadMoreHideClick: function (e) {
        e.preventDefault();
        this.setState({bigTextVisible:	false});
    },
    onShowCommClick: function (e){
        e.preventDefault();
        this.setState({commentsVisible: true});
    },
    onHideCommClick: function (e){
        e.preventDefault();
        this.setState({commentsVisible: false});
    },
    onDeleteClick: function (e) {
        window.ee.emit('News.delete', this.props.item.id);
    },
    onEditClick: function (e) {
        // edit handler
    },
    render: function () {

        return(
            <div className="article">
                <div className="article-body">
                    <p className="article-author">{this.props.item.author}</p>
                    <p className="article-text">{this.props.item.text}</p>
                    <a className={"article-link-readmore " + ((!this.state.bigTextVisible && this.props.item.bigText) ? "" : "none")} href="#" onClick={this.onReadMoreShowClick}>More</a>
                    <p className={"article-bigText " + ((this.state.bigTextVisible && this.props.item.bigText) ? "" : "none")}>{this.props.item.bigText}</p>
                    <a className={"article-link-hide " + (this.state.bigTextVisible ? "" : "none")} href="#" onClick={this.onReadMoreHideClick}>Hide</a>
                    <a className={"article-link-show-comm " + (this.state.commentsVisible ? "none" : "")} href="#" onClick={this.onShowCommClick}>Show comments</a>
                    <a className={"article-link-hide-hide-comm " + (this.state.commentsVisible ? "" : "none")} href="#" onClick={this.onHideCommClick}>Hide comments</a>
                    <span className="article-delete" title="Delete this news" onClick={this.onDeleteClick}>&nbsp;</span>
                    <span className="article-edit" title="Edit this news" onClick={this.onEditClick}>&nbsp;</span>
                </div>
                <div className={"article-comments " + (this.state.commentsVisible ? "" : "none")}>
                    <ol className="bullet">
                        <Comments comments={this.props.item.comments}/>
                    </ol>
                </div>
            </div>
        );
    }
});

var NewsForm = React.createClass({
    componentDidMount: function () {
        ReactDOM.findDOMNode(this.refs.authorInput).focus();

    },
    onFormSubmit: function (e) {
        e.preventDefault();
        alert(
            'Author: ' + ReactDOM.findDOMNode(this.refs.authorInput).value + "\n" +
            'Text: ' + ReactDOM.findDOMNode(this.refs.textInput).value + "\n" +
            'BigText: ' + ReactDOM.findDOMNode(this.refs.checkrule).checked
        );
    },
    onCancelButtonClick: function () {
        window.ee.emit('NewsForm.cancel.add');
    },
    onChangeCheckRule: function (e) {
        ReactDOM.findDOMNode(this.refs.submitNewsButton).disabled = !e.target.checked;
    },
    render: function () {
        return(
            <form className='add cf'>
                <input type="text" ref="authorInput" className="add__author" placeholder="Enter the author of the article" defaultValue="" />
                <input type="text" ref="textInput" className="add__text" placeholder="Enter the abridged text of the article" defaultValue="" />
                <textarea type="text" ref="bigTextInput" className="add__big_text" placeholder="Enter the full text of the article" defaultValue="" />
                <label	className='add__checkrule'>
                    <input	type='checkbox'	defaultChecked={false}	ref='checkrule'	onChange={this.onChangeCheckRule}/>I agree with the rules
                </label>
                <button ref="submitNewsButton" className="add__btn" onClick={this.onFormSubmit} disabled>Add news</button>
                <button ref="cancelAddNewsButton" className="cancel__btn" onClick={this.onCancelButtonClick}>Cancel</button>
            </form>
        );
    }
});

var News = React.createClass({
    componentDidMount: function () {
        var	self	=	this;
        window.ee.addListener('NewsForm.cancel.add', function()	{
            self.setState({showForm: false});
        });
    },
    propTypes:	{
        news:	React.PropTypes.array.isRequired
    },
    getInitialState: function () {
        return{
            showForm: false
        };
    },
    onAddButtonClick: function (e) {
        e.preventDefault();
        this.setState({showForm: true});
    },
    render: function(){
        var news = this.props.news;
        if(news.length > 0){
            var newsTemplate = news.map(function(item){
                return(
                    <div className="articleWrapper" key={item.id}>
                        <Article item={item}/>
                    </div>
                );
            });
        } else {
            var newsTemplate = <p>No news</p>;
        }

        return(
            <div className="news">
                {newsTemplate}
                {this.state.showForm ? <NewsForm /> : ""}
                <a className={"add-button " + (this.state.showForm ? "none" : "")}  href="#" onClick={this.onAddButtonClick} title="Add news">
                    <span className="add-icon">&nbsp;</span>
                    <span className="add-text">Add</span>
                </a>
                <strong className={"news__count " + (news.length ? '' : 'none')}>Total news: {news.length}</strong>
            </div>
        );
    }
});

var App = React.createClass({
    componentDidMount:	function()	{
        var	self	=	this;

        window.ee.addListener('News.delete',	function(id)	{
            var arr = self.state.news;
            var indexToRemove = arr.findIndex(obj => obj.id == id);
            arr.splice(indexToRemove , 1);
            self.setState({news:	arr});
        });
    },
    getInitialState: function () {
        return{
            news: myNews,
        };
    },
    render: function(){
        return(
            <div className="app">
                <h1>News</h1>
                <News news={this.state.news}/>
            </div>
        );
    }
});

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);