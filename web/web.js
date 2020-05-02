$(document).ready(function () {
        // The node to be monitored
        var main_panel = $('body')[0];

        // Create an observer instance
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                var newNodes = mutation.addedNodes; // DOM NodeList
                if (newNodes !== null) { // If there are new nodes added
                    var $nodes = $(newNodes); // jQuery set
                    $nodes.each(function () {
                        var $node = $(this);
                        if (this.localName === 'p') {
                            $node.find('span').each(function () {
                                // Check if it's a link by seeing if the span is underlined... TODO: Anything else
                                if (this.style.textDecoration === 'underline') {
                                    $child = $(this);

                                    // Build the new element
                                    $linkNode = $('<a/>');
                                    $linkNode.attr('href', this.innerText.toLowerCase().startsWith('http://') ?
                                        this.innerText :
                                        'https://' + this.innerText);
                                    $linkNode.attr('target', '_blank');
                                    $linkNode.append(this.innerText);

                                    // Style the new element
                                    $linkNode[0].style.color = this.style.color;
                                    $linkNode[0].style.fontSize = this.style.fontSize;
                                    $linkNode[0].style.fontWeight = this.style.fontWeight;
                                    $linkNode[0].style.fontFamily = this.style.fontFamily;
                                    $linkNode[0].style.textDecoration = this.style.textDecoration;

                                    // Replace with newly created link
                                    $child.replaceWith($linkNode);
                                }
                            })
                        }
                    });
                }
            });
        });

        // Configuration of the observer:
        var config = {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true
        };

        // Pass in the target node, as well as the observer options
        observer.observe(main_panel, config);
    }
)