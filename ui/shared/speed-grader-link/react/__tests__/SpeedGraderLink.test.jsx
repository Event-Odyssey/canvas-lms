/*
 * Copyright (C) 2019 - present Instructure, Inc.
 *
 * This file is part of Canvas.
 *
 * Canvas is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react'
import ReactDOM from 'react-dom'
import SpeedGraderLink from '../index'

const container = document.createElement('div')
container.setAttribute('id', 'fixtures')
document.body.appendChild(container)

const ok = x => expect(x).toBeTruthy()
const strictEqual = (x, y) => expect(x).toStrictEqual(y)

describe('SpeedGraderLink', () => {
  let $container
  let context

  function mountComponent() {
    // eslint-disable-next-line no-restricted-properties
    ReactDOM.render(<SpeedGraderLink {...context} />, $container)
  }

  function getLink() {
    return $container.querySelector(`a[href="${context.href}"]`)
  }

  beforeEach(() => {
    $container = document.body.appendChild(document.createElement('div'))
    context = {
      disabled: false,
      href: 'https://example.com',
      disabledTip: '',
    }
  })

  afterEach(() => {
    ReactDOM.unmountComponentAtNode($container)
    $container.remove()
  })

  test('renders a link with the href', () => {
    mountComponent()
    ok(getLink())
  })

  test('renders a disabled link when disabled', () => {
    context.disabled = true
    mountComponent()
    strictEqual(getLink().getAttribute('aria-disabled'), 'true')
  })

  test('the disabled link prevents default on clicks', () => {
    context.disabled = true
    const event = new MouseEvent('click', {bubbles: true, cancelable: true})
    mountComponent()
    getLink().dispatchEvent(event)
    strictEqual(event.defaultPrevented, true)
  })

  // fails in Jest, passes in QUnit
  test.skip('renders a tooltip when disabled', () => {
    context.disabled = true
    context.disabledTip = 'tooltip text'
    mountComponent()
    const tooltip = document.getElementById(getLink().getAttribute('aria-describedby'))
    strictEqual(tooltip.innerText, 'tooltip text')
  })

  test('has a class of "icon-speed-grader"', () => {
    mountComponent()
    strictEqual(getLink().className, 'icon-speed-grader')
  })

  test('takes optional classes', () => {
    context.className = 'classA classB'
    mountComponent()
    strictEqual(getLink().className, 'icon-speed-grader classA classB')
  })
})
