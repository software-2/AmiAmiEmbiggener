You know how AmiAmi constantly has those server overloaded errors? Yeah, that's in part because they don't scale their images down to the smallest size necessary. Instead, they serve you pretty large images and then scale them down. When browsing through the used or preorder list, this extension makes the images bigger to make impulse purchasing needless plastic toys easier.

This was haphazardly slapped together in less time than it took me to write documentation and post it online. I'm sure there's more elegant (read: sane) ways of doing this, but you see, I'm incredibly lazy. In fact, as soon as I got ready to push this to github I realized this would be better as a greasemonkey script. Oh well! Ship it!

## Scope Creep

Clicking the next page button is annoying. I added keyboard arrow navigation to pages.

## Example
(Github may be scaling these images down at different sizes. Click on them to get true scale difference.)

Before:

![Before](https://github.com/software-2/AmiAmiEmbiggener/blob/master/examples/before.jpg?raw=true)

After:

![After](https://github.com/software-2/AmiAmiEmbiggener/blob/master/examples/after.jpg?raw=true)

## Installation

I'm not maintaining this enough to put it on the Chrome store. You can easily install it in developer mode.
- Go to `chrome://extensions/`
- Click Load Unpacked
- Select the folder this extension is saved to