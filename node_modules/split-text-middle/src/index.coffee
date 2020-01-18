module.exports = (text) ->
  halfOfTextLength = Math.floor(text.length / 2)
  halfOfText = text.substr(0, halfOfTextLength)
  separator = halfOfText.match(/[,|;|.]\s+/gi)

  middleOfText =
    if separator
      halfOfText.lastIndexOf(separator[Math.floor(separator.length - 1)])
    else
      Math.floor(halfOfTextLength)

  before = text.lastIndexOf(' ', middleOfText)
  after = text.indexOf(' ', middleOfText + 1)

  middle =
    if before is -1 or after isnt -1 and
      middleOfText - before >= after - middleOfText
        after
      else
        before

  {
    first: text.substr(0, middle)
    last: text.substr(middle + 1)
  }