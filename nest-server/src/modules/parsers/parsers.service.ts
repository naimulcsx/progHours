import { ForbiddenException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as cheerio from 'cheerio';
import { lastValueFrom } from 'rxjs';
import * as path from 'path';
import * as url from 'url';

@Injectable()
export class ParsersService {
  constructor(private httpService: HttpService) {}
  parseProblem(link) {
    const parserMap = {
      'codeforces.com': this.cfParser,
      'lightoj.com': this.lightOjParser,
      'onlinejudge.org': this.uvaOjParser,
      'cses.fi': this.csesParser,
      'toph.co': this.tophParser,
      'spoj.com': this.spojParser,
      'www.spoj.com': this.spojParser,
      'atcoder.jp': this.atCoderParser,
      'www.atcoder.jp': this.atCoderParser,
    };
    try {
      let hostname = new URL(link).hostname;
      return parserMap[hostname].call(this, link);
    } catch (err) {}
  }

  /**
   *  Parser for codeforces.com
   */
  async cfParser(link) {
    const getPID = (link) => {
      let pid = '',
        parts = link.split('/');
      if (parts.length !== 7) return -1;
      if (parts.includes('contest')) pid = 'CF' + '-' + parts[4] + parts[6];
      if (parts.includes('problemset'))
        pid = 'CF' + '-' + parts.slice(-2).join('');
      return pid.split('?')[0]; // ? ignoring query strings
    };
    const { data } = await lastValueFrom(this.httpService.get(link));
    const $ = cheerio.load(data);

    // extract informations
    let difficulty = 0;
    const tags = [];
    const pid = getPID(link);
    const name = $('.title').html().split('. ')[1];
    $('.roundbox .tag-box').each(function (i, e) {
      const tag = $(this).text().trim();
      if (tag.includes('*') && tag.indexOf('*') === 0)
        difficulty = parseInt(tag.substring(1));
      else tags.push(tag);
    });
    const judgeId = 1;
    return {
      pid,
      name,
      tags,
      difficulty,
      judgeId,
    };
  }

  /**
   *  Parser for lightoj.com
   */
  async lightOjParser(link) {
    const { data } = await lastValueFrom(this.httpService.get(link));
    const $ = cheerio.load(data);
    // extract informations
    const pid = $('.tags .is-link').text().trim();
    const name = $('.title').text().trim();
    const difficulty = 0;
    const tags = [];
    const judgeId = 6;
    return {
      pid,
      name,
      tags,
      difficulty,
      judgeId,
    };
  }

  /**
   *  Parser for onlineJudge.com(UVA)
   */
  async uvaOjParser(link) {
    const { data } = await lastValueFrom(this.httpService.get(link));
    const $ = cheerio.load(data);

    const str = $('.floatbox tr td h3').text().trim();
    const parts = str.split(' - ');

    const pid = 'UVA-' + parts[0];
    const name = parts.slice(1).join(' ').trim();
    const difficulty = 0;
    const tags = [];
    const judgeId = 7;

    return {
      pid,
      name,
      tags,
      difficulty,
      judgeId,
    };
  }

  /**
   *  Parser for cses.fi(CSES)
   */
  async csesParser(link) {
    const { data } = await lastValueFrom(this.httpService.get(link));
    const $ = cheerio.load(data);

    const name = $('.title-block h1').text().trim();

    // problem id
    const { name: pathName } = path.parse(link);
    const splitName = pathName.includes('lang')
      ? pathName.split('?')[0]
      : pathName;

    const pid = 'CSES-' + splitName;

    // problem difficulty
    const difficulty = 0;

    // problem tags
    const tags = [];

    // attached judgeId
    const judgeId = 8;

    return {
      pid,
      name,
      tags,
      difficulty,
      judgeId,
    };
  }

  /**
   *  Parser for toph.co
   */
  async tophParser(link) {
    const { data } = await lastValueFrom(this.httpService.get(link));
    const $ = cheerio.load(data);

    // problem name
    const pname = $('.artifact__caption h1').text().trim();
    const name = pname;

    /// problem id
    const { name: pathName } = path.parse(link);
    const splitName = pathName.includes('lang')
      ? pathName.split('?')[0]
      : pathName;

    const pid = 'TOPH-' + splitName;

    // problem difficulty
    const difficulty = 0;

    // problem tags
    const tags = [];
    $('.flair__item .text a').each(function () {
      const tag = $(this).text().trim();
      tags.push(tag);
    });
    const judgeId = 9;

    return {
      pid,
      name,
      tags,
      difficulty,
      judgeId,
    };
  }

  /**
   *  Parser for spoj.com
   */
  async spojParser(link) {
    const { data } = await lastValueFrom(this.httpService.get(link));
    const $ = cheerio.load(data);

    const str = $('.prob #problem-name').text().trim();
    const parts = str.split(' - ');
    const name = parts[1];
    const pid = 'SPOJ-' + parts[0];

    const difficulty = 0;
    const tags = [];
    const judgeId = 2;

    return {
      pid,
      name,
      tags,
      difficulty,
      judgeId,
    };
  }
  /**
   *  Parser for spoj.com
   */
  async atCoderParser(link) {
    const { data } = await lastValueFrom(this.httpService.get(link));
    const $ = cheerio.load(data);

    // problem name
    const parse = $('#main-container .row span.h2').text().trim();
    const name = parse.split('\n')[0].split('-')[1];

    // problem Id
    const parseLink = url.parse(link, true);
    const splitName = parseLink.pathname.split('/')[4];
    const pid = 'AC-' + splitName;

    // problem difficulty
    const difficulty = 0;

    // problem tags
    const tags = [];
    const judgeId = 4;

    return {
      pid,
      name,
      tags,
      difficulty,
      judgeId,
    };
  }
}
