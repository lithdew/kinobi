import { programLinkNode } from '@kinobi-so/nodes';
import { test } from 'vitest';

import {
    expectDebugStringVisitor,
    expectDeleteNodesVisitor,
    expectIdentityVisitor,
    expectMergeVisitorCount,
} from '../_setup';

const node = programLinkNode('mplCandyGuard', 'mplCandyMachine');

test('mergeVisitor', () => {
    expectMergeVisitorCount(node, 1);
});

test('identityVisitor', () => {
    expectIdentityVisitor(node);
});

test('deleteNodesVisitor', () => {
    expectDeleteNodesVisitor(node, '[programLinkNode]', null);
});

test('debugStringVisitor', () => {
    expectDebugStringVisitor(node, `programLinkNode [mplCandyGuard.from:mplCandyMachine]`);
});
