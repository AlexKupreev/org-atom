'use babel';

import OrgAtomView from './org-atom-view';
import { CompositeDisposable } from 'atom';

export default {

  orgAtomView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.orgAtomView = new OrgAtomView(state.orgAtomViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.orgAtomView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'org-atom:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.orgAtomView.destroy();
  },

  serialize() {
    return {
      orgAtomViewState: this.orgAtomView.serialize()
    };
  },

  toggle() {
    console.log('OrgAtom was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
