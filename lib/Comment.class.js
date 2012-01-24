"use strict"; // run code in ES5 strict mode

/**
 * Represents a comment in the source code
 *
 * @class Comment
 * @extends js.String
 */
function Comment() {
    var This = this;
    this.Public = {};

    /**
     * @private
     * @type {String}
     */
    this.comment = null;

    /**
     * @public
     * @param {String} newComment
     * @return {lib.Comment}
     */
    this.setComment = this.Public.setComment = function setComment(newComment) {

        this.comment = newComment;
        return this.Public;

    }.bind(this);

    /**
     * @public
     * @return {String}
     */
    this.getComment = this.Public.setComment = function getComment() {

        return this.comment;

    }.bind(this);

    /**
     * Returns the comment as a string
     *
     * @public
     * @return {js.String}
     */
    this.toString = function toString() {

        return this.comment;

    }.bind(this);

    return This.Public;
}

module.exports = function Constructor() {
    Comment.prototype = new String(); // ignore JSLint warning here, it's the right way to do
    return new Comment();
};